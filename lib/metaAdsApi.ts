export interface AdCampaignConfig {
  productId:     string;
  productName:   string;
  productImage:  string;
  productUrl:    string;
  caption:       string;
  budget:        number;
  durationDays:  number;
  targetCities?: string[];
}

export interface AdCampaignResult {
  success:         boolean;
  campaignId?:     string;
  adSetId?:        string;
  adId?:           string;
  estimatedReach?: string;
  error?:          string;
}

const BASE = 'https://graph.facebook.com/v19.0';

const CITY_IDS: Record<string, string> = {
  Karachi:    '2673730',
  Lahore:     '2671778',
  Islamabad:  '2673697',
  Rawalpindi: '2673756',
  Faisalabad: '2673687',
  Multan:     '2673726',
  Peshawar:   '2673745',
  Quetta:     '2673755',
};

async function metaPost(path: string, body: Record<string, unknown>) {
  const res  = await fetch(`${BASE}/${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ ...body, access_token: process.env.META_ACCESS_TOKEN }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

export async function createInstagramBoostCampaign(
  cfg: AdCampaignConfig
): Promise<AdCampaignResult> {
  try {
    const adAccountId = process.env.META_AD_ACCOUNT_ID;
    const budgetCents = Math.round((cfg.budget / 280) * 100);
    const start       = Math.floor(Date.now() / 1000);
    const end         = start + cfg.durationDays * 86400;

    const campaign = await metaPost(`${adAccountId}/campaigns`, {
      name: `Boost: ${cfg.productName}`, objective: 'OUTCOME_TRAFFIC',
      status: 'ACTIVE', special_ad_categories: [],
    });

    const cityList = (cfg.targetCities ?? Object.keys(CITY_IDS))
      .map((c) => CITY_IDS[c]).filter(Boolean).map((id) => ({ key: id }));

    const adSet = await metaPost(`${adAccountId}/adsets`, {
      name: `AdSet: ${cfg.productName}`, campaign_id: campaign.id,
      daily_budget: budgetCents, start_time: start, end_time: end,
      billing_event: 'IMPRESSIONS', optimization_goal: 'LINK_CLICKS', status: 'ACTIVE',
      targeting: {
        geo_locations:       { countries: ['PK'], cities: cityList },
        age_min: 18, age_max: 55,
        publisher_platforms: ['instagram'],
        instagram_positions: ['stream', 'story', 'reels'],
        flexible_spec: [{ interests: [
          { id: '6003387496661', name: 'Home decoration' },
          { id: '6003206374693', name: 'Handicraft' },
          { id: '6003139266461', name: 'Pottery' },
          { id: '6003564461998', name: 'Painting' },
          { id: '6002910667848', name: 'Art' },
        ]}],
      },
    });

    const creative = await metaPost(`${adAccountId}/adcreatives`, {
      name: `Creative: ${cfg.productName}`,
      object_story_spec: {
        page_id:            process.env.META_PAGE_ID,
        instagram_actor_id: process.env.META_INSTAGRAM_ACTOR_ID,
        link_data: {
          image_url: cfg.productImage, link: cfg.productUrl, message: cfg.caption,
          call_to_action: { type: 'SHOP_NOW', value: { link: cfg.productUrl } },
        },
      },
    });

    const ad = await metaPost(`${adAccountId}/ads`, {
      name: `Ad: ${cfg.productName}`, adset_id: adSet.id,
      creative: { creative_id: creative.id }, status: 'ACTIVE',
    });

    return {
      success: true, campaignId: campaign.id, adSetId: adSet.id, adId: ad.id,
      estimatedReach: `${budgetCents * 50}-${budgetCents * 100} people/day`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[MetaAds]', msg);
    return { success: false, error: msg };
  }
}

export async function getCampaignInsights(campaignId: string) {
  const params = new URLSearchParams({
    fields:       'impressions,reach,clicks,spend,cpc,ctr',
    date_preset:  'last_7d',
    access_token: process.env.META_ACCESS_TOKEN ?? '',
  });
  const res  = await fetch(`${BASE}/${campaignId}/insights?${params}`);
  const data = await res.json();
  return data.data?.[0] ?? null;
}

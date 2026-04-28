import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-red-400 to-purple-500
                              flex items-center justify-center text-white font-bold text-lg">M</div>
              <div>
                <p className="font-playfair font-bold text-white text-lg leading-tight">Mirha Rainbow Interiors</p>
                <p className="text-xs text-amber-400">Handmade with love in Pakistan</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Unique handcrafted ceramics, paintings, calligraphy, pottery and more.
              Custom orders welcome. Delivering nationwide across Pakistan.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['Home','/'],['Gallery','/gallery'],['About','/about'],['Order Now','/order']].map(([label,href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-amber-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                   target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-green-400 transition-colors">
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                   target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-purple-400 transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {year} Mirha Rainbow Interiors. All rights reserved.</p>
          <p>Handcrafted with love in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}

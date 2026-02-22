export default function PaymentIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Visa */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Visa">
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <text x="24" y="20" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">VISA</text>
      </svg>

      {/* Mastercard */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Mastercard">
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="8" fill="#EB001B" />
        <circle cx="29" cy="16" r="8" fill="#F79E1B" />
        <path d="M24 9.37a8 8 0 010 13.26 8 8 0 000-13.26z" fill="#FF5F00" />
      </svg>

      {/* Vipps */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Vipps">
        <rect width="48" height="32" rx="4" fill="#FF5B24" />
        <text x="24" y="20" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Vipps</text>
      </svg>

      {/* Klarna */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Klarna">
        <rect width="48" height="32" rx="4" fill="#FFB3C7" />
        <text x="24" y="20" textAnchor="middle" fill="#0A0B09" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Klarna</text>
      </svg>

      {/* Apple Pay */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Apple Pay">
        <rect width="48" height="32" rx="4" fill="#000" />
        <text x="24" y="20" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Apple Pay</text>
      </svg>

      {/* Google Pay */}
      <svg viewBox="0 0 48 32" className="h-7 w-auto" aria-label="Google Pay">
        <rect width="48" height="32" rx="4" fill="#fff" stroke="#ddd" />
        <text x="24" y="20" textAnchor="middle" fill="#5F6368" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Google Pay</text>
      </svg>
    </div>
  );
}

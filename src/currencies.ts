export interface Currency {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾', symbol: 'RM' },
  { code: 'USD', name: 'United States Dollar', country: 'United States', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳', symbol: '¥' },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬', symbol: 'S$' },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: '🇮🇳', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷', symbol: '₩' },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭', symbol: '₱' },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽', symbol: 'Mex$' },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦', symbol: 'R' },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', country: 'Poland', flag: '🇵🇱', symbol: 'zł' },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷', symbol: '₺' },
  { code: 'ILS', name: 'Israeli New Shekel', country: 'Israel', flag: '🇮🇱', symbol: '₪' },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺', symbol: 'Ft' },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿', symbol: 'Kč' },
  { code: 'BGN', name: 'Bulgarian Lev', country: 'Bulgaria', flag: '🇧🇬', symbol: 'лв' },
  { code: 'RON', name: 'Romanian Leu', country: 'Romania', flag: '🇷🇴', symbol: 'lei' },
  { code: 'ISK', name: 'Icelandic Króna', country: 'Iceland', flag: '🇮🇸', symbol: 'kr' }
];

export const POPULAR_CURRENCIES = ['THB', 'MYR', 'USD', 'EUR', 'GBP', 'JPY', 'SGD'];

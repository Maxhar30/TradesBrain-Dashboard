# TradesBrain — Dashboard

## Your Role
You are the dashboard agent for TradesBrain.
Own ONLY files inside this repo.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Recharts (analytics)
- Socket.io client (real-time)
- Stripe.js

## Structure
src/
├── app/
│   ├── (auth)/         # login, register
│   ├── (dashboard)/    # main app
│   │   ├── jobs/
│   │   ├── calls/
│   │   ├── technicians/
│   │   ├── invoices/
│   │   ├── quotes/
│   │   └── settings/
├── components/
│   ├── ui/             # shadcn components
│   └── dashboard/      # custom components
└── lib/                # API client, utils

## Rules
- All API calls go to api.tradesbrain.io
- Use Next.js server actions where possible
- Mobile responsive — works on all screen sizes
- Dark mode support
- Never hardcode secrets — use .env.local
- When done: summarize what was built, open PR to dev branch

## Brand Colors
--tb-navy:        #0C2340   /* primary — navbar, headings, footer */
--tb-navy-light:  #1E3A5F   /* hover states */
--tb-orange:      #F97316   /* CTA buttons, highlights */
--tb-orange-dark: #EA6B0A   /* button hover */
--tb-bg:          #F8FAFC   /* page background */
--tb-text:        #64748B   /* body text */
--tb-border:      #E2E8F0   /* cards, dividers */
--tb-success:     #16A34A
--tb-error:       #DC2626
--tb-warning:     #D97706
# MindCare AI - AI-Powered Behavioral Health Platform

A comprehensive web platform showcasing AI-powered behavioral health coordination and care delivery. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Platform Capabilities
- **AI-Powered Intake & Screening**: 24/7 conversational intake with DSM-5-guided assessments
- **Intelligent Triage & Referral**: Rule-based routing to appropriate specialists
- **Clinical Insights & Treatment Planning**: AI-generated summaries and editable treatment plans
- **Smart Dashboards**: Real-time views for patients and clinicians
- **Automated Scheduling & Billing**: Streamlined operational workflows

### Clinical Scope
- **Neurodevelopmental Disorders**: ASD, ADHD (AQ-10, ASRS assessments)
- **Anxiety Disorders**: GAD, Social Anxiety, Panic Disorder (GAD-7)
- **Depressive Disorders**: MDD, Persistent Depressive Disorder (PHQ-9, PHQ-2)
- **Trauma & Stress**: PTSD (PCL-5)
- **Substance & Addictive Disorders**: Alcohol/Drug Use (AUDIT, DAST)
- **Personality Disorders**: BPD (MSI-BPD)

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel-ready
- **Icons**: Heroicons (SVG)

## 📁 Project Structure

```
src/
├── app/
│   ├── demo/           # Interactive demo page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── FeatureCard.tsx
│   └── StatsCard.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthtech
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with platform overview
- Current challenges in behavioral health
- Key features showcase
- Patient journey flow
- Clinical scope and assessments
- Benefits for all stakeholders
- Call-to-action sections

### Demo Page (`/demo`)
- Interactive conversational intake demo
- Step-by-step assessment process
- Real-time AI responses
- Progress tracking
- Care recommendations

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Trust, healthcare
- **Secondary**: Purple (#7c3aed) - Innovation, AI
- **Success**: Green (#16a34a) - Positive outcomes
- **Warning**: Orange (#ea580c) - Attention needed
- **Error**: Red (#dc2626) - Critical issues

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible font stack
- **Interactive**: Hover states and transitions

## 🔧 Customization

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update navigation in layout files
4. Style with Tailwind CSS classes

### Styling
- Use Tailwind CSS utility classes
- Custom styles in `src/app/globals.css`
- Component-specific styles in individual files

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all device sizes

## 🔒 Security & Privacy

- HIPAA-compliant design considerations
- Secure data handling patterns
- Privacy-first approach
- No sensitive data in demo

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Other Platforms
- Netlify
- AWS Amplify
- Docker containers

## 📊 Performance

- Optimized images and assets
- Lazy loading components
- Efficient bundle splitting
- Fast page loads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check documentation

## 🔮 Roadmap

- [ ] Patient portal implementation
- [ ] Clinician dashboard
- [ ] EHR integration
- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Multi-language support

---

**MindCare AI** - Transforming behavioral health care through intelligent automation and AI-powered solutions.

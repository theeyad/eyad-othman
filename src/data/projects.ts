export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  longDescription: string;
  longDescriptionAr: string;
  image: string;
  gallery?: string[];
  techStack: string[];
  highlights: string[];
  highlightsAr: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    slug: "al-adl",
    title: "AL-ADL ORGANIZATION",
    titleAr: "مؤسسة العدل القانونية",
    category: "Freelance",
    categoryAr: "عمل حر",
    description:
      "A 7-page responsive website for a paying legal organization client, collaborating with a backend developer who handled server and hosting.",
    descriptionAr:
      "موقع ويب متكامل من 7 صفحات لمؤسسة قانونية، بالتعاون مع مطور خلفية تولى إدارة الخادم والاستضافة.",
    longDescription:
      "Built a complete 7-page responsive web platform for Al-Adl legal organization. The application features multi-page client routing, contact and consultation inquiry forms, legal service directories, and comprehensive mobile optimization. Collaborated directly with a backend developer for server endpoints, CORS configuration, and production hosting deployment.",
    longDescriptionAr:
      "تطوير منصة ويب متكاملة من 7 صفحات لمؤسسة العدل القانونية. تشمل المنصة توجيهاً متعدد الصفحات، ونماذج حجز الاستشارات القانونية، وأدلة الخدمات القانونية مع توافق كامل مع كافة الأجهزة المحمولة. تم التعاون المباشر مع مطور خلفية لربط واجهات الـ API وإعدادات الخادم والنشر.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React Hook Form", "REST API"],
    highlights: [
      "Engineered 7 distinct pixel-perfect, responsive page layouts from client briefs",
      "Seamless client-side routing with clean component architecture and reusable UI elements",
      "Robust consultation booking form validation with error state handling",
      "Optimized Core Web Vitals achieving sub-second Largest Contentful Paint (LCP)",
      "Collaborated with backend engineering for structured REST API consumption",
    ],
    highlightsAr: [
      "بناء 7 صفحات متجاوبة ومتوافقة بدقة مع متطلبات العميل",
      "توجيه سلس بين الصفحات مع معمارية مكونات برمجية قابلة لإعادة الاستخدام",
      "نماذج طلب استشارات قانونية مدعومة بنظام تحقق دقيق ومعالجة متقدمة للأخطاء",
      "تحسين مؤشرات أداء الويب لتحقيق سرعة تحميل قياسية",
      "تنسيق مباشر مع مطور الخلفية لربط الـ REST APIs بسلاسة",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
  {
    id: "2",
    slug: "ic-academy",
    title: "IC ACADEMY",
    titleAr: "أكاديمية آي سي",
    category: "Web Application",
    categoryAr: "تطبيق ويب",
    description:
      "Interactive programming learning platform designed for structured developer tracks, real-world projects, and skill tracking.",
    descriptionAr:
      "منصة تعليمية تفاعلية لمسارات البرمجة المنهجية مع مشاريع وتطبيقات واقعية.",
    longDescription:
      "IC Academy is a modern interactive learning platform providing curated developer tracks, interactive module roadmaps, code preview playgrounds, and progress metrics. The application delivers an engaging interface optimized for both desktop and mobile experiences.",
    longDescriptionAr:
      "أكاديمية آي سي هي منصة تعليمية حديثة تقدم مسارات برمجية متخصصة، وخرائط تعلم تفاعلية، ومساحات لمراجعة الكود، ومتابعة فورية لمستوى الطالب، مع تصميم متجاوب فائق السرعة على الأجهزة المحمولة والحواسيب.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    highlights: [
      "Modular course track explorer with dynamic module filtering and search",
      "Lightweight global state management powered by Zustand",
      "Animated progress bars and interactive completion checkpoints",
      "Fully responsive dark and light theme consistency",
    ],
    highlightsAr: [
      "مستعرض مسارات برمجية مع فلاتر تصفية وبحث لحظي متقدم",
      "إدارة الحالة العامة للتطبيق عبر Zustand لضمان خفة الأداء وسرعة الاستجابة",
      "أشرطة تقدم متحركة ونقاط متابعة إنجاز تفاعلية",
      "توافق تام مع الوضعين الداكن والفاتح",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
  {
    id: "3",
    slug: "meddopamine",
    title: "MEDDOPAMINE",
    titleAr: "ميد دوبامين للتعليم الطبي",
    category: "Medical & LMS",
    categoryAr: "منصة طبية",
    description:
      "Advanced clinical education platform delivering expert-led courses, interactive medical modules, and automated certificates.",
    descriptionAr:
      "منصة تعليمية للأبحاث السريرية والطبية مع دورات معتمدة وإصدار فوري للشهادات.",
    longDescription:
      "A specialized LMS for medical students and researchers, MedDopamine provides structured clinical modules, interactive quizzes, student progress analytics, downloadable research materials, and automated verification certificates upon course completion.",
    longDescriptionAr:
      "منصة تعليمية متخصصة لطلاب وباحثي المجال الطبي، توفر دورات سريرية مكثفة، واختبارات تفاعلية، ولوحة تحكم تحليلية للطلاب، ومواد بحثية قابلة للتحميل، مع نظام أوتوماتيكي لإصدار الشهادات المعتمدة.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Zod"],
    highlights: [
      "Comprehensive course syllabus viewer with video and resource downloads",
      "Strict schema validation on user registration and quiz responses via Zod",
      "Automated completion certificates with cryptographic verification IDs",
      "High-contrast accessible typography tailored for extended reading",
    ],
    highlightsAr: [
      "مستعرض شامل للمناهج الطبية مع دعم المحاضرات والمواد القابلة للتحميل",
      "نظام تحقق مدعوم بـ Zod لكافة النماذج واختبارات التقييم",
      "نظام إصدار شهادات معتمد بأرقام تحقق أوتوماتيكية",
      "خطوط وتنسيقات عالية الوضوح مريحة للقراءة الطويلة والدراسة",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
  {
    id: "4",
    slug: "store-101",
    title: "101 STORE",
    titleAr: "متجر 101 للإلكترونيات",
    category: "E-Commerce",
    categoryAr: "تجارة إلكترونية",
    description:
      "Modern electronics and tech accessories storefront with real-time cart, category filters, and seamless checkout experience.",
    descriptionAr:
      "متجر إلكتروني حديث للأجهزة الذكية والإلكترونيات مع سلة مشتريات فورية وتجربة دفع متطورة.",
    longDescription:
      "101 Store is a modern high-performance e-commerce frontend built for technology retail. Features multi-attribute product filters, sticky drawer cart, real-time inventory previews, and an ultra-fast checkout flow.",
    longDescriptionAr:
      "متجر 101 هو واجهة تجارة إلكترونية فائقة السرعة مخصصة للأجهزة التقنية الذكية، يحتوي على فلاتر متعددة للمنتجات، وسلة مشتريات جانبية ديناميكية، وتجربة دفع سلسة ومختصرة.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    highlights: [
      "Real-time cart drawer with instant quantity modification and price calculation",
      "Instant faceted search filtering by price range, brand, and category",
      "Fluid micro-animations on product cards with zero performance overhead",
      "Prepared for Supabase backend order synchronization",
    ],
    highlightsAr: [
      "سلة مشتريات جانبية فورية مع تحديث مباشر للكميات وحساب الأسعار",
      "بحث وفلاتر فورية حسب السعر، العلامة التجارية، والفئات",
      "تفاعلات حركية ناعمة لبطاقات المنتجات بأداء فائق",
      "جاهز للربط مع قاعدة بيانات Supabase لإدارة الطلبات",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
  {
    id: "5",
    slug: "herb-veda",
    title: "HERB VEDA",
    titleAr: "هيرب فيدا للمنتجات الطبيعية",
    category: "E-Commerce & Wellness",
    categoryAr: "عناية وصحة",
    description:
      "Organic skincare and herbal wellness platform featuring editorial brand aesthetics, ingredient transparency, and responsive design.",
    descriptionAr:
      "منصة لمنتجات العناية بالبشرة والأعشاب الطبيعية بتصميم تحريري راقٍ وتجربة تسوق متكاملة.",
    longDescription:
      "Herb Veda is a beauty and wellness lifestyle store highlighting botanical ingredients, customer reviews, product certification badges, and an editorial grid layout.",
    longDescriptionAr:
      "هيرب فيدا هو متجر رقمي لمنتجات العناية الطبيعية والصحة، يبرز المكونات العشبية، وتقييمات العملاء، مع تصميم تحريري شبكي متطور يعكس فخامة العلامة التجارية.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    highlights: [
      "Editorial aesthetic with balanced white-space and modern typography",
      "Interactive ingredient glossary modal with visual botanical graphics",
      "Optimized responsive layout across mobile, tablet, and widescreen",
      "Accessible ARIA landmarks and keyboard-navigable elements",
    ],
    highlightsAr: [
      "طابع بصري تحريري مع تناسق متوازن في المساحات وتوزيع الخطوط",
      "دليل تفاعلي لمكونات المنتجات وفوائد الأعشاب الطبيعية",
      "توافق وتجاوب كامل مع الهواتف الذكية والأجهزة اللوحية والشاشات العريضة",
      "معايير سهولة وصول متقدمة للمستخدمين ودعم كامل للتنقل بلوحة المفاتيح",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
  {
    id: "6",
    slug: "devdock-dashboard",
    title: "DEVDOCK SAAS",
    titleAr: "لوحة تحكم ديف دوك",
    category: "SaaS & Dashboard",
    categoryAr: "لوحة تحكم سحابية",
    description:
      "Developer productivity and metrics workspace dashboard with real-time commit stats, theme toggling, and clean visual analytics.",
    descriptionAr:
      "لوحة تحكم لمتابعة إنتاجية وإحصائيات المطورين مع رسوم بيانية وتحليلات بصرية تفاعلية.",
    longDescription:
      "DevDock provides engineering teams with central visibility into project pipelines, deploy logs, commit velocity, and infrastructure health metrics. Built with a modular component system and strict zero-shadow styling.",
    longDescriptionAr:
      "توفر ديف دوك لفرق البرمجة لوحة مركزية شاملة لمتابعة مسار المشاريع، وسجلات النشر، ومعدل إنجاز الأكواد، وصحة الخوادم، مبنية بنظام مكونات قياسي خفيف وسريع.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Next.js", "React 19", "Tailwind CSS v4", "TypeScript"],
    highlights: [
      "Real-time analytical graphs with native CSS logical layout support",
      "Fluid binary dark/light theme switching with zero color flash",
      "High data density with readable Manrope & Bebas typography",
      "Keyboard shortcut navigation palette for quick actions",
    ],
    highlightsAr: [
      "رسوم بيانية تحليلية فورية مع دعم الخصائص المنطقية للاتجاهات",
      "تبديل ثنائي ناعم بين المظهرين الداكن والفاتح بدون أي وميض",
      "كثافة معلوماتية متوازنة باستخدام خطوط مانروب وبيباس",
      "لوحة أوامر سريعة مدعومة باختصارات لوحة المفاتيح",
    ],
    liveUrl: "https://github.com/theeyad",
    githubUrl: "https://github.com/theeyad",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

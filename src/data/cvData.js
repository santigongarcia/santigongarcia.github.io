// Estructura de datos del CV de Santiago González García
// Fuente: perfil LinkedIn / CV exportado

export const profile = {
  name: "Santiago González García",
  handle: "santiago",
  role: "Técnico de Sistemas y Redes",
  currentRole: "Técnico de redes en el CGT Norte de la DGT",
  avatar: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/72099bd7b_1653942645660.jpg",
  location: "Valladolid, Castilla y León — España",
  summary:
    "Joven apasionado por la informática y la tecnología de la información. Actualmente mi vida profesional ha dado un cambio de rama tecnológica: trabajo como técnico de redes y sistemas para un importante ente público perteneciente al Ministerio del Interior del Gobierno de España.",
  contact: {
    email: "santigongarcia@gmail.com",
    linkedin: "https://www.linkedin.com/in/santigongarcia",
    linkedinHandle: "in/santigongarcia",
    web: "https://santigongarcia.epizy.com/",
    webHandle: "santigongarcia.epizy.com",
  },
};

export const skills = {
  Software: ["Firewalls", "Switching / Routing", "MySQL", "HTML & CSS", "Documentación de red"],
  Hardware: ["RJ45 / Fibra óptica", "Switches Última Milla", "Equipos ITS", "Reparación de hardware"],
  "Sistemas operativos": ["Linux", "Windows Server", "Windows", "VyOS / FortiOS"],
};

export const vendors = [
  { name: "Teldat", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/a0efb3ff0_Teldat-Corporate-Logo.png" },
  { name: "Huawei", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/94f03fd29_Huawei-Logowine.png" },
  { name: "Alcatel Lucent", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/4861245f4_Alcatel_Lucent_Logosvg.webp" },
  { name: "H3C", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/96ed2a0a6_highly-logo.webp" },
  { name: "Fortinet", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/33c58561e_Fortinet_Logo.png" },
  { name: "Cisco", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/380a3b6ad_Cisco_logo_blue_2016svg.webp" },
  { name: "TP-Link", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/91f36f134_TPLINK_Logo_2svg.webp" },
  { name: "Allied Telesys", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/1debf4397_AlliedTelesis-logo-5stripe-stacked-rgb.webp" },
  { name: "Raisecom", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/fa3612968_logo-raisecom.png" },
  { name: "Teltonika", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/cd0c3f65f_Teltonika-logotipas.png" },
  { name: "InHand", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/71a9e1474_InHand-logo.webp" },
  { name: "Hikvision", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/cb7479365_Hikvision.webp" },
  { name: "Lenovo", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/0f21c2adb_Branding_lenovo-logo_lenovologoposred_low_res.png" },
  { name: "HP", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/6b9da5b56_HP_logo_2025svg.webp" },
  { name: "Dell", logoUrl: "https://media.base44.com/images/public/6ab04a2fe7f70e5fc936a7ea/74f7c524f_Dell_Logosvg.webp" },
];

export const certifications = [
  { name: "Ciberseguridad en la industria 4.0", issuer: "Formación especializada", tag: "SEC-4.0" },
  { name: "Curso de HTML y CSS", issuer: "Formación web", tag: "WEB-01" },
  { name: "BIG-IP Fundamentals", issuer: "F5 Networks", tag: "F5-FUND" },
  { name: "NSE 3 — Network Security Associate", issuer: "Fortinet", tag: "NSE-03" },
  { name: "CCNA Routing & Switching", issuer: "Cisco", tag: "CCNA-RS" },
];

export const experience = [
  {
    company: "UTE INDRA · CPS · PONS",
    role: "Técnico de Sistemas y Redes",
    period: "jun 2024 — Presente",
    duration: "2 años 4 meses",
    location: "Valladolid",
    points: [
      "Administrador de Sistemas y Redes para el Centro de Gestión de Tráfico Norte de la DGT.",
      "Creación de reglas de firewall, mantenimiento y actualización de firewalls.",
      "Creación de documentación de red.",
      "Configuración de switches Última Milla Raisecom y Alcatel.",
      "Gestión de direccionamiento de equipos ITS.",
    ],
    logo: "INDRA",
  },
  {
    company: "Empatiza Consulting",
    role: "Técnico de redes",
    period: "dic 2023 — jun 2024",
    duration: "7 meses",
    location: "Valladolid",
    points: [
      "Administración de soporte de redes para el grupo sanitario privado Affidea España.",
      "Creación de reglas de firewall y segmentación de redes de nuevos centros.",
      "Configuración de equipos de red y auditorías.",
      "Puestas en marcha de redes de centros y estudios Wi-Fi.",
      "Coordinación con proveedores y clientes; implementación de túneles VPN.",
    ],
    logo: "EMPATIZA",
  },
  {
    company: "Junta de Castilla y León (vía Empatiza)",
    role: "Técnico de redes — Centro de Operaciones de Redes y Servicios",
    period: "dic 2021 — dic 2023",
    duration: "2 años 1 mes",
    location: "Valladolid",
    points: [
      "Técnico de redes para el Centro de Operaciones de Redes y Servicios de la Junta de Castilla y León.",
      "Operación y supervisión de la red autonómica.",
    ],
    logo: "JCyL",
  },
  {
    company: "Inetum",
    role: "Técnico de soporte",
    period: "feb 2020 — dic 2021",
    duration: "1 año 11 meses",
    location: "Valladolid",
    points: [
      "Técnico de soporte de nivel 1 para la Consejería de Educación de la Junta de Castilla y León.",
      "Proyecto SATIC: soporte informático a todos los centros educativos del territorio autonómico.",
    ],
    logo: "INETUM",
  },
  {
    company: "ALTEN",
    role: "Técnico de soporte",
    period: "oct 2020 — feb 2021",
    duration: "5 meses",
    location: "Boecillo, Valladolid",
    points: [
      "Soporte de primer nivel para una importante multinacional del entretenimiento a ámbito nacional.",
    ],
    logo: "ALTEN",
  },
  {
    company: "Santander Tecnología",
    role: "Técnico informático",
    period: "dic 2019 — ene 2020",
    duration: "2 meses",
    location: "Valladolid",
    points: [
      "Técnico informático encargado de la zona central de Valladolid.",
      "Maquetación de equipos, configuración de red e impresoras.",
      "Resolución de incidencias y soporte a clientes.",
    ],
    logo: "SANTANDER",
  },
  {
    company: "Huella Verde",
    role: "Desarrollador web",
    period: "jun 2018 — sep 2018",
    duration: "4 meses",
    location: "Valladolid",
    points: [
      "Director del departamento de informática en Huella Verde.",
      "Construcción de infraestructuras digitales: creación y administración de páginas web.",
      "Creación de mails de empresa y plan de desarrollo informático y digitalización.",
    ],
    logo: "HVERDE",
  },
  {
    company: "Login Tecnologías de la Información",
    role: "Becario",
    period: "mar 2018 — jun 2018",
    duration: "4 meses",
    location: "Zaratán, Valladolid",
    points: [
      "Mantenimiento de equipos informáticos y reparación de hardware.",
      "Gestión de bases de datos mediante MySQL.",
    ],
    logo: "LOGINTI",
  },
];

export const education = [
  {
    center: "MEDAC",
    title: "Curso de especialización en entornos de las Tecnologías de la Información",
    period: "ene 2025 — jun 2025",
  },
  {
    center: "IES Galileo",
    title: "CFGS — Administración de Sistemas Informáticos y Redes",
    period: "2018 — 2020",
  },
  {
    center: "IES Galileo",
    title: "CFGM — Sistemas Microinformáticos y Redes",
    period: "2016 — 2018",
  },
];

export const languages = [
  { name: "Español", level: "Nativo / Bilingüe", pct: 100 },
  { name: "Inglés", level: "Professional Working", pct: 70 },
  { name: "Japonés", level: "Elementary", pct: 25 },
];
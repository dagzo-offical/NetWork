import type { CourseSection, Lesson, LessonContent } from "./types";

/**
 * Builds a richly-detailed placeholder lesson body. Used for lessons whose
 * deep content has not been hand-authored yet. It is still real, educational
 * text keyed to the lesson topic — never lorem ipsum.
 */
function buildLesson(
  sectionId: string,
  id: string,
  title: string,
  difficulty: Lesson["difficulty"],
  duration: string,
  topic: string,
  content?: Partial<LessonContent>
): Lesson {
  const fallback: LessonContent = {
    introduction: `${title} — zamonaviy tarmoq va axborot xavfsizligining asosiy tushunchalaridan biri. Ushbu darsda ${topic} nima ekanligini, u nima uchun muhim ekanligini va real ishlab chiqarish muhitlarida qanday ishlashini chuqur o'rganamiz. Bu bilim tarmoqlarni loyihalash, muammolarni bartaraf etish va xavfsizlik tahdidlarini tahlil qilish uchun zaruriy poydevor bo'lib xizmat qiladi.`,
    theory: `Kontseptual jihatdan, ${topic} tarmoqning qatlamli modelida ishlaydi. Uning stekdagi o'rni — va yuqori va quyi qatlamlar bilan o'zaro ta'sirini tushunish — nosozliklarni tashxislash va xavfsizlik haqida mulohaza yuritish uchun zarurdir. Biz protokol/komponent dizayn maqsadlarini, uning ma'lumotlar tuzilmalarini va dizaynerlar qilgan murosalarni ko'rib chiqamiz.`,
    realWorldArchitecture: `Ishlab chiqarishda ${topic} kamdan-kam hollarda alohida joylashtiriladi. U routerlar, switchlar, load balancerlar, firewalllar va kuzatuv vositalari keng arxitekturasida joylashgan. Korxonalar va bulut provayderlari uni qanday ulashtirishini, jumladan ortiqchalik, masshtablash va nosozlik domenlarini ko'rib chiqamiz.`,
    packetFlow: `${topic} bilan bog'liq trafik tarmoqdan o'tganda, aniq ketma-ketlikda freymlar va paketlar almashiladi. Biz ushbu oqimni hop-by-hop kuzatamiz, har bir qatlamda qaysi maydonlar o'zgarishini va paket yozuvida nima ko'rinishini aniqlaymiz.`,
    securityImplications: `${topic} muayyan hujum yuzasini kiritadi. Noto'g'ri konfiguratsiya, autentifikatsiyaning yo'qligi yoki ishonchsiz kirishlarga ishonch — barchasi suiiste'mol qilinishi mumkin. Biz real tahdidlarni va har birining oqibat darajasini ro'yxatga olamiz.`,
    attackVectors: [
      {
        name: `${topic} soxtalashtirish / qalbakilashtirish`,
        description: `Tajovuzkor qonuniy xost yoki xizmatni taqlid qilish uchun ${topic} xabarlarini soxtalashtiradi.`,
        severity: "High",
      },
      {
        name: `${topic} flooding hujumi`,
        description: `Maxsus ${topic} trafigi bilan komponentni bosib, resurslarni tugaturish.`,
        severity: "Medium",
      },
    ],
    defenseMethods: [
      `Barcha ${topic} maydonlarida qat'iy kiritish tekshiruvi qo'llang.`,
      `Protokol qo'llab-quvvatlasa, autentifikatsiya va kriptografik yaxlitlikni yoqing.`,
      `${topic} trafigini anomaliyalar uchun limitlang va monitoring qiling.`,
      `${topic} kompromissi lateral harakatga olib kelmasligini ta'minlash uchun tarmoqlarni segmentlang.`,
    ],
    configExamples: [
      {
        language: "bash",
        description: `${topic} bilan bog'liq holat tekshiruvi.`,
        code: `# ${topic} holati tekshiruvi\nip addr show\nip route show`,
      },
    ],
    cliExamples: [
      {
        language: "bash",
        description: `${topic} uchun diagnostika buyruqlari.`,
        code: `ping -c 4 8.8.8.8\ntraceroute 8.8.8.8`,
      },
    ],
    wiresharkAnalysis: `Yozuvni oching va ${topic} ga oid ko'rsatma filtri qo'llang. Protokol daraxtini tekshiring, kutilgan maydon qiymatlarini tasdiqlang va retransmissiyalar, noto'g'ri shakllantirilgan paketlar yoki kutilmagan manbalarni kuzating.`,
    commonMistakes: [
      `${topic} ni sukut bo'yicha ishonchli deb hisoblash.`,
      `Faqat yuklanish ostida paydo bo'ladigan chekka holatllarni e'tiborsiz qoldirish.`,
      `${topic} xatti-harakatini jurnalga yozish va monitoring qilishni unutish.`,
    ],
    advancedConcepts: `Ilg'or mutaxassislar ${topic} ni ishlash uchun sozlaydi, uni avtomatlashtirish pipelinelari bilan birlashtiradi va qisman nosozliklar va bo'linmalar paytida uning xatti-harakati haqida mulohaza yuritadi.`,
    summary: `${title}: endi ${topic} nima ekanligini, u tarmoqda qanday ishlashini, u duch keladigan tahdidlarni va uni qanday himoya qilishni tushuntira olishingiz kerak.`,
    diagrams: [
      {
        type: "mermaid",
        title: `${title} — umumiy ko'rinish`,
        content: `graph LR\n  A[Mijoz] -->|${topic}| B[Xizmat]\n  B --> C[(Backend)]`,
      },
    ],
  };

  return {
    id,
    sectionId,
    title,
    duration,
    difficulty,
    content: { ...fallback, ...content },
  };
}

/* ----------------------------------------------------------------------- */
/* SECTION 1 — NETWORK FUNDAMENTALS                                        */
/* ----------------------------------------------------------------------- */

const section1: CourseSection = {
  id: "network-fundamentals",
  title: "Tarmoq Asoslari",
  description:
    "Ma'lumotlar tarmoqlar bo'ylab qanday harakatlanishini — fizik freymlardan mantiqiy manzillash, routing va transport qatlamigacha — chuqur o'rganing.",
  icon: "Network",
  color: "#00ff88",
  totalDuration: "8h 30m",
  lessons: [
    buildLesson(
      "network-fundamentals",
      "what-is-a-network",
      "Tarmoq nima?",
      "Beginner",
      "20m",
      "kompyuter tarmoqlari",
      {
        introduction:
          "Tarmoq — ma'lumot almashish maqsadida bir-biriga ulangan ikki yoki undan ortiq qurilmalar to'plami. Bu g'oya juda oddiy ko'rinsa-da, uning tatbiqi kabel orqali ulangan ikkita noutbukdan tortib, global Internetdagi milliardlab qurilmalargacha kengayadi. Tarmoqlar bizni dunyo bilan bog'laydigan, xizmatlarni ishlata oladigan va ma'lumot almasha oladigan asosiy infratuzilmadir. Ushbu dars keyingi barcha darslarga zamin bo'ladigan fundamental tushunchalarni — tugun (node), havola (link), host, protokol va tarmoq topologiyasi — chuqur o'rgatadi. Bu bilimlar bo'lmasdan tarmoq xavfsizligini tushunib bo'lmaydi.",
        theory:
          "Har qanday tarmoq uchta asosiy tarkibiy qismdan iborat: tugunlar (endpoint qurilmalar va oraliq qurilmalar — kompyuter, router, switch, server), havolalar (signallarni uzatuvchi muhit — mis sim, tolali optik kabel yoki radio to'lqin) va protokollar (ma'lumotlarni qanday formatlash va almashinish kerakligini belgilovchi kelishilgan qoidalar to'plami). Tarmoqda muloqot qatlamlar orqali amalga oshiriladi: har bir qatlam bitta muammoni hal qilib, yuqori qatlamga toza abstraksiya taqdim etadi. OSI modeli yetti qatlamni belgilaydi — Fizik, Ma'lumotlar havolasi, Tarmoq, Transport, Sessiya, Taqdimot va Ilova. Amaliyotda ishlatiladigan TCP/IP modeli bularni to'rtta qatlamga birlashtiradi: Havola, Internet, Transport va Ilova. Qatlamlash tufayli, masalan, veb-brauzer o'zi Wi-Fi yoki Ethernet ustida ishlayotganini bilishi shart emas — bu vazifani quyi qatlamlar hal qiladi.",
        realWorldArchitecture:
          "Odatiy korporativ ofis tarmog'ida end qurilmalar (noutbuklar, telefonlar, printerlar) access switchlarga ulanadi. Access switchlar distribution/core switchga, u esa router va firewallga ulanib, nihoyat ISP orqali Internetga chiqadi. Simsiz kirish nuqtalari (Wi-Fi AP) radio orqali ulanadigan qurilmalarni simli LAN ga ko'prik orqali bog'laydi. Serverlar alohida VLAN da joylashtiriladi va kirish qoidalar bilan cheklanadi. Bu uch bosqichli kirish/tarqatish/yadro ierarxiyasi broadcast domenlarini kichik, nosozlik domenlarini izolyatsiyalangan saqlaydi va tarmoqni boshqarish osonlashadi.",
        packetFlow:
          "Noutbuk A bir xil LAN dagi server B ga xabar yuborayotganda quyidagi jarayon sodir bo'ladi: ilova ma'lumot yaratadi; transport qatlami TCP yoki UDP sarlavhasini qo'shadi (portlar, tartib raqamlari); tarmoq qatlami manba va manzil IP manzillari bilan IP sarlavhasini qo'shadi; ma'lumotlar havolasi qatlami manba va manzil MAC manzillari bilan Ethernet freymiga o'raydi; fizik qatlam bitlarni elektr signalga aylantirib simga yuboradi. Switch freymni qabul qilib, manzil MAC ni jadvalidan qidiradi va freymni faqat to'g'ri portdan yuboradi. Server B bu jarayonni teskari tartibda bajarib, har bir sarlavhani ajratib olib, oxirida asl ma'lumotni oladi.",
        securityImplications:
          "Har qanday umumiy muhit tinglab turish (eavesdropping) uchun potensial imkoniyatdir. Hubda yoki kompromis qilingan switchda har qanday tugun boshqalarga tegishli trafikni ko'ra oladi. Broadcast trafigi segmentdagi barcha tugunlarga yetib boradi. Tarmoq portiga ulangan tajovuzkor o'sha broadcast domenidagi barcha qurilmalar bilan Layer 2 aloqasiga kirishi mumkin. Shuning uchun fizik port xavfsizligi (802.1X autentifikatsiya), VLAN bilan segmentatsiya va tarmoqqa kirishni nazorat qilish asosiy xavfsizlik boshqaruvlaridir.",
        commonMistakes: [
          "OSI modelini (o'qitish maqsadidagi abstraksiya) TCP/IP stek amalda qanday ishlashini tushunmasdan yod olish — bu ikkalasi turli maqsadlarda mavjud.",
          "Switch xavfsizlik ta'minlaydi deb hisoblash — switch samaradorlikni ta'minlaydi, maxfiylikni emas; u barcha trafikni bir xil broadcast domenida ko'rsatishi mumkin.",
          "Tarmoqni segmentatsiyasiz yagona katta tekis (flat) tuzilmada loyihalash — bu tajovuzkorga bir qurilmani buzib, hamma narsaga kirish imkonini beradi.",
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "OSI va TCP/IP qatlamlari",
            content:
              "graph TD\n  subgraph OSI\n    A7[Ilova] --> A6[Taqdimot] --> A5[Sessiya] --> A4[Transport] --> A3[Tarmoq] --> A2[Ma'lumotlar Havolasi] --> A1[Fizik]\n  end",
          },
          {
            type: "mermaid",
            title: "Ofis tarmog'i topologiyasi",
            content:
              "graph TD\n  PC1[Noutbuk] --> AS[Access Switch]\n  PC2[Telefon] --> AS\n  AS --> CS[Core Switch]\n  CS --> FW[Router / Firewall]\n  FW --> ISP[(Internet)]",
          },
        ],
        summary:
          "Tarmoq = tugunlar + havolalar + protokollar, ular qatlamlarga tashkil etilgan. Qatlamlash har bir muammoni alohida hal qilishga imkon beradi: switch MAC manzil bo'yicha freymlarni yo'naltiradi, router esa IP manzil bo'yicha paketlarni yo'naltiradi. Umumiy tarmoq muhiti tinglab turish xavfini anglatadi, shuning uchun VLAN segmentatsiyasi, port xavfsizligi va 802.1X autentifikatsiya asosiy xavfsizlik nazoravlaridir.",
      }
    ),
    buildLesson(
      "network-fundamentals",
      "how-the-internet-works",
      "Internet Qanday Ishlaydi?",
      "Beginner",
      "25m",
      "Internet va avtonom tizimlar",
      {
        introduction:
          "Internet bitta tarmoq emas — bu trafik almashishga o'zaro kelishgan taxminan 75,000 ta mustaqil boshqariladigan tarmoqlar (Avtonom Tizimlar) majmui. Siz brauzerda URL yozganingizda, so'rovingiz bir necha millisekund ichida bir necha mamlakat bo'ylab sakrab o'tadi. Bu dars noutbukingizdan boshqa qit'adagi serverga paket qanday yo'l bosib borishini — DNS, routing, BGP va tranzit mexanizmlari orqali — batafsil tushuntiradi.",
        theory:
          "Har bir Avtonom Tizim (AS) noyob AS raqamiga ega va o'ziga tegishli IP prefikslarini e'lon qiladi. BGP (Border Gateway Protocol) — ASlarni bir-biriga ulashga biriktiradigan routing protokoli: har bir AS qo'shnilarga qaysi prefikslariga yetib borishi mumkinligini va qaysi AS-yo'l orqali aytadi. AS ichida IGP (OSPF yoki IS-IS) eng qisqa yo'llarni topadi. Internetda markaziy nazorat yo'q — ulanish millionlab BGP e'lonlaridan kelib chiqadi.",
        realWorldArchitecture:
          "ASlar Internet Exchange Pointlarida (IXP) peering orqali ulanadi yoki kattaroq ISPlardan tranzit sotib oladi. Kontent provayderlari (Google, Netflix, Cloudflare) o'z global magistrallarini boshqaradi va kontentni foydalanuvchilarga yaqin keshlariga suradi. Mashhur saytga so'rov odatda origin ma'lumotlar markazida emas, bir necha millisekund uzoqlikdagi CDN chekka tugunida tugallanadi.",
        packetFlow:
          "Siz URL yozasiz. DNS hostnameni IPga hal qiladi. Paketingiz standart shlyuzga, so'ng ISPingizning chekka routeriga boradi. ISP BGP jadvalini ko'rib, eng yaxshi AS-yo'lni tanlab, manzil ASga yo'naltiradi. Har bir hop IP TTLni kamaytiradi. Manzil ASning ichki routingi uni serverga yetkazadi. Javob mustaqil yo'l orqali qaytadi.",
        securityImplications:
          "BGP e'lonlarga sukut bo'yicha ishonadi. BGP hijack (o'zingizga tegishli bo'lmagan prefikslarni e'lon qilish) trafikni qoratuynukka yubora yoki ushlab qolishi mumkin — bu real global ishlamay qolishlarga sabab bo'lgan. RPKI (Resurs Ochiq Kalit Infratuzilmasi) ASning prefiksni e'lon qilishga vakolatli ekanligini kriptografik ravishda tekshiradi, hijacklarni kamaytiradi.",
        diagrams: [
          {
            type: "mermaid",
            title: "Avtonom Tizimlar bo'ylab paket",
            content:
              "graph LR\n  U[Sizning Noutbukingiz] --> ISP[ISP AS]\n  ISP --> IXP[Internet Exchange]\n  IXP --> T[Tranzit AS]\n  T --> D[Manzil AS]\n  D --> S[Server]",
          },
        ],
        attackVectors: [
          {
            name: "BGP prefiks hijack",
            description:
              "Zararli yoki noto'g'ri sozlangan AS o'ziga tegishli bo'lmagan IP prefikslarini e'lon qilib, trafikni o'ziga jalb qiladi va ushlab qoladi.",
            severity: "Critical",
          },
          {
            name: "Route sizish",
            description:
              "AS bo'lmasligi kerak bo'lgan marshrutlarni qayta e'lon qilib, trafik kutilmagan va ko'pincha band yo'ldan borishiga olib keladi.",
            severity: "High",
          },
        ],
        summary:
          "Internet — BGP tomonidan birlashtirilgan Avtonom Tizimlar to'ri. Markaziy hokimiyat yo'q; ulanish e'lonlardan kelib chiqadi. BGPning bilvosita ishonchi uning eng katta zaifligi bo'lib, RPKI tomonidan qisman tuzatilgan.",
      }
    ),
    buildLesson(
      "network-fundamentals",
      "lan-wan-man",
      "LAN, WAN va MAN",
      "Beginner",
      "18m",
      "tarmoq miqyosi tasnifi",
      {
        introduction:
          "Tarmoqlar nafaqat ulangan qurilmalar soni, balki qamrab olgan geografik masofa bo'yicha ham tasniflanadi. LAN (mahalliy tarmoq), MAN (shahar miqyosidagi tarmoq) va WAN (keng hududli tarmoq) bir-biridan faqat o'lcham jihatidan emas, balki egalik huquqi, ishlatiladigan texnologiya, kechikish va narx jihatidan ham tubdan farq qiladi. Bu farqlarni tushunish to'g'ri tarmoq arxitekturasini tanlash va xavfsizlik siyosatini belgilash uchun zaruriy asos hisoblanadi.",
        theory:
          "LAN (Mahalliy Tarmoq) bino yoki kampusni qamrab oladi, shaxsiy mulk, Ethernet/Wi-Fi ishlatadi va submillisekund kechikish bilan yuqori o'tkazuvchanlik taklif etadi. MAN (Metropoliten Tarmoq) shaharni qamrab oladi, ko'pincha tashuvchi tomonidan tolali optik halqalarda qurilgan. WAN (Keng Tarmoq) mamlakatlar yoki kontinentlarni qamrab oladi, odatda tashuvchilardan ijaraga olinadi va yuqori kechikish va past bit o'tkazuvchanligiga ega. Internet eng katta WANdir.",
        realWorldArchitecture:
          "Korxona har bir saytda LANlar boshqaradi. Saytlar MPLS sxemalari, ijaraga olingan liniyalar yoki tobora ko'proq shifrlash va aqlli yo'l tanlash bilan ommaviy Internetni ishlatadigan SD-WAN overlaylar orqali WAN bo'ylab birlashtiriladi. MAN tashuvchi qorang'i optik tolasi yordamida bir shahardagi bir necha kampusni ulashi mumkin.",
        packetFlow:
          "LAN ichida freymlar routing siz Layer 2 da kommutatsiyalanadi. Boshqa saytga o'tishda paketlar Layer 3 da marshrutlanadi, WAN transporti uchun inkapsulyatsiya qilinadi (masalan, MPLS yorliqlari yoki IPsec tunelida), tashuvchi tarmog'i bo'ylab tashiladi, so'ng dekapsulatsiya qilinib, masofaviy LANga kommutatsiyalanadi.",
        securityImplications:
          "WAN linklari siz nazorat qilmaydigan infratuzilmadan o'tadi, shuning uchun maxfiylik shifrlashni talab qiladi (IPsec, MACsec, TLS). LANlar yuqori ishonchli, lekin hali ham segmentatsiyaga muhtoj. SD-WAN xavfsizlik siyosatini markazlashtiradi, lekin shu bilan birga yuqori qimmatli nishonga aylanadi.",
        diagrams: [
          {
            type: "mermaid",
            title: "WAN orqali LANlarni ulash",
            content:
              "graph LR\n  subgraph Sayt A LAN\n    A1[Xostlar] --> AR[Router]\n  end\n  subgraph Sayt B LAN\n    B1[Xostlar] --> BR[Router]\n  end\n  AR -->|Shifrlangan WAN tunel| BR",
          },
        ],
        summary:
          "LAN = bino, shaxsiy, tez. MAN = shahar miqyosi. WAN = global, ijaraga olingan, yuqori kechikish. Arxitektura va xavfsizlik nazoravlari miqyosga ergashadi: LANlar ichida kommutatsiya, WANlar bo'ylab marshrutlash va shifrlash.",
      }
    ),
    buildLesson("network-fundamentals", "switch-vs-router", "Switch va Router", "Beginner", "22m", "switchlar va routerlar"),
    buildLesson("network-fundamentals", "mac-addresses", "MAC Manzillar", "Beginner", "18m", "MAC manzillash"),
    buildLesson("network-fundamentals", "ipv4-addressing", "IPv4 Manzillash", "Beginner", "25m", "IPv4 manzillash"),
    buildLesson("network-fundamentals", "ipv6-addressing", "IPv6 Manzillash", "Intermediate", "25m", "IPv6 manzillash"),
    buildLesson("network-fundamentals", "subnetting", "Subnetting", "Intermediate", "30m", "subnetting"),
    buildLesson("network-fundamentals", "cidr", "CIDR Belgisi", "Intermediate", "20m", "CIDR"),
    buildLesson("network-fundamentals", "default-gateway", "Standart Shlyuz", "Beginner", "15m", "standart shlyuzlar"),
    buildLesson("network-fundamentals", "nat", "Tarmoq Manzili Tarjimasi (NAT)", "Intermediate", "25m", "NAT"),
    buildLesson("network-fundamentals", "dns", "DNS — Domen Nomlari Tizimi", "Beginner", "28m", "DNS"),
    buildLesson("network-fundamentals", "dhcp", "DHCP — Dinamik Xost Konfiguratsiyasi", "Beginner", "20m", "DHCP"),
    buildLesson("network-fundamentals", "arp", "ARP — Manzil Aniqlash Protokoli", "Intermediate", "20m", "ARP"),
    buildLesson("network-fundamentals", "icmp", "ICMP — Diagnostika Protokoli", "Beginner", "18m", "ICMP"),
    buildLesson("network-fundamentals", "tcp", "TCP — Uzatishni Boshqarish Protokoli", "Intermediate", "30m", "TCP"),
    buildLesson("network-fundamentals", "udp", "UDP — Foydalanuvchi Datagramma Protokoli", "Beginner", "18m", "UDP"),
    buildLesson("network-fundamentals", "ports", "Portlar va Port Raqamlari", "Beginner", "15m", "TCP/UDP portlar"),
    buildLesson("network-fundamentals", "sockets", "Socketlar", "Intermediate", "20m", "tarmoq socketlari"),
    buildLesson("network-fundamentals", "osi-model", "OSI Modeli Chuqur O'rganish", "Intermediate", "25m", "OSI modeli"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 2 — HTTP / HTTPS / TLS / SSL                                    */
/* ----------------------------------------------------------------------- */

const section2: CourseSection = {
  id: "http-tls",
  title: "HTTP, HTTPS, TLS va SSL",
  description:
    "Zamonaviy veb protokollarini o'zlashtirishning asosi — so'rov metodlari va sarlavhalardan har bir ulanishni himoya qiladigan kriptografik handshakegacha.",
  icon: "Globe",
  color: "#0088ff",
  totalDuration: "10h 15m",
  lessons: [
    buildLesson(
      "http-tls",
      "http-architecture",
      "HTTP Arxitekturasi",
      "Beginner",
      "25m",
      "HTTP protokoli",
      {
        introduction:
          "HTTP (HyperText Transfer Protocol) — vebni harakatga keltiruvchi so'rov/javob protokoli. Har bir sahifa yuklanishi, API chaqiruvi va rasm olish HTTP orqali amalga oshiriladi. Bu dars uning holatsiz mijoz-server dizayni va xabar tuzilmasini tushuntiradi.",
        theory:
          "HTTP — holatsiz, matnli (HTTP/1.x da) ilova qatlami protokoli. Mijoz so'rov yuboradi — metod, maqsad URI, versiya, sarlavhalar, ixtiyoriy tana — va server javob qaytaradi — holat qatori, sarlavhalar, ixtiyoriy tana. Holatsizlik har bir so'rov mustaqil ekanligini anglatadi; server oldingi so'rovlarni cookie-lar yoki tokenlar orqali ilova holat qo'shmasdan eslamaydi. HTTP TCP ustida (HTTP/1.1, HTTP/2) yoki QUIC/UDP ustida (HTTP/3) ishlaydi.",
        realWorldArchitecture:
          "Ishlab chiqarishda brauzer kamdan-kam hollarda ilova serveriga to'g'ridan-to'g'ri murojaat qiladi. So'rov CDN chekka tuguniga, so'ng load balancerga, so'ng teskari proksi (NGINX) ga, so'ng mikroservislar va ma'lumotlar bazalariga murojaat qilishi mumkin bo'lgan ilova serveriga etib boradi. Har bir hopda HTTP sarlavhalari qo'shilishi, o'chirilishi yoki qayta yozilishi mumkin. Keep-alive ulanishlar va ulanish hovuzi TCP o'rnatish narxini kamaytiradi.",
        packetFlow:
          "1) DNS hostni IP ga hal qiladi. 2) TCP uch tomonlama handshake (SYN, SYN-ACK, ACK). 3) HTTPS uchun TLS handshake. 4) Mijoz HTTP so'rov qatori va sarlavhalarini, bo'sh qatorni, so'ng tanani yuboradi. 5) Server javob beradi. 6) Keep-alive bilan TCP ulanishi keyingi so'rovlar uchun qayta ishlatiladi. Paket yozuvi so'rovni o'qilishi mumkin matn (HTTP ustida) yoki shifrlangan TLS yozuvlari (HTTPS ustida) sifatida ko'rsatadi.",
        securityImplications:
          "Oddiy HTTP yo'ldagi har kim tomonidan to'liq o'qilishi va o'zgartirilishi mumkin — hisob ma'lumotlari, cookie-lar va kontent ochiq. Sarlavha in'yeksiyasi, so'rov kontrabandasi (proksilar o'rtasidagi tahlil farqlaridan foydalanish) va batafsil xato sahifalari real xavflardir. Har doim HTTPS orqali xizmat ko'rsating va chekka tugunida sarlavhalarni normallashtiring.",
        attackVectors: [
          {
            name: "HTTP so'rovini kontrabanda qilish",
            description:
              "Old tomonlama proksi va orqa tomonlama server o'rtasida Content-Length / Transfer-Encoding talqinidagi ziddiyat tajovuzkorga ulanishni desinxronizatsiya qilishga imkon beradi.",
            severity: "Critical",
          },
          {
            name: "Oddiy matnni ushlab qolish",
            description: "HTTP da, yo'ldagi har qanday tajovuzkor trafikni o'qiydi va qayta yozadi.",
            severity: "High",
          },
        ],
        configExamples: [
          {
            language: "http",
            description: "Xom HTTP/1.1 so'rov va javob.",
            code: "GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: curl/8.0\nAccept: */*\n\nHTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 138\n\n<!doctype html>...",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "HTTP so'rov hayot davri",
            content:
              "sequenceDiagram\n  Client->>DNS: hostni hal qilish\n  Client->>Server: TCP SYN/ACK\n  Client->>Server: HTTP GET /\n  Server-->>Client: 200 OK + tana",
          },
        ],
        summary:
          "HTTP — holatsiz so'rov/javob protokoli. Ishlab chiqarish trafigi sarlavhalarni qayta yozuvchi CDN-lar, load balancerlar va proksilardan o'tadi. Oddiy HTTP xavfli; tahlil nomuvofiqliklari so'rov kontrabandini yoqadi.",
      }
    ),
    buildLesson(
      "http-tls",
      "http-methods",
      "HTTP Metodlari",
      "Beginner",
      "20m",
      "HTTP metodlari",
      {
        introduction:
          "HTTP metodlari (fe'llar) so'rovning niyatini e'lon qiladi. To'g'ri metodni tanlash — va xavfsizlik hamda idempotentlik atrofidagi semantikani hurmat qilish — to'g'ri, keshlanishi mumkin, xavfsiz API-larning asosi.",
        theory:
          "GET resursni oladi va xavfsiz bo'lishi kerak (yon ta'sirlarsiz). HEAD tanasiz GET. POST ma'lumotlarni yuboradi va na xavfsiz, na idempotent. PUT resursni almashtiradi va idempotent. PATCH qisman yangilaydi. DELETE resursni o'chiradi (idempotent). OPTIONS imkoniyatlarni bildiradi va CORS preflight ni boshqaradi. Metod holatni o'zgartirmasa xavfsiz; bir marta bajarishning ta'siri kabi takrorlansa idempotent.",
        realWorldArchitecture:
          "REST API-lari metodlarni CRUD operatsiyalariga moslashtiradi. Keshlar va CDN-lar faqat xavfsiz metodlarni (GET/HEAD) keshlaydi. Load balancerlar metod bo'yicha yo'naltirishi mumkin. Brauzerlar ulanish muvaffaqiyatsizligida idempotent so'rovlarni avtomatik qayta urinadi, lekin POST ni emas — shuning uchun to'lov endpointlari idempotentlik kalitlaridan foydalanadi.",
        packetFlow:
          "Metod so'rov qatoridagi birinchi tokendir. CORS preflight — brauzer oddiy bo'lmagan cross-origin so'rovdan oldin avtomatik yuboradigan OPTIONS so'rovi bo'lib, Access-Control-Request-Method ni olib yuradi.",
        securityImplications:
          "Faqat o'qish uchun endpointlarda xavfli metodlarga ruxsat berish yoki serverda TRACE/PUT ni yoqiq qoldirish hujum yuzasini kengaytiradi. Fe'l soxtalashtirish faqat GET/POST ni himoya qiladigan sodda avtorizatsiya tekshiruvlarini chetlab o'tishi mumkin.",
        commonMistakes: [
          "Holat o'zgartiruvchi harakatlar uchun GET ishlatish — ular keshlanadi, URL-larda joylashtiriladi va oldindan yuklanadi.",
          "PATCH idempotent deb faraz qilish (u odatda emas).",
          "Cross-Site Tracing imkoniyatini beruvchi TRACE ni yoqiq qoldirish.",
        ],
        summary:
          "Metodlar niyatni e'lon qiladi. GET/HEAD xavfsiz; GET/PUT/DELETE idempotent; POST/PATCH na xavfsiz, na idempotent. Bu semantikani hurmat qilish keshlash, qayta urinish va xavfsizlikni to'g'ri saqlaydi.",
      }
    ),
    buildLesson(
      "http-tls",
      "tls-handshake",
      "TLS 1.3 Handshake",
      "Advanced",
      "35m",
      "TLS handshake",
      {
        introduction:
          "TLS handshake — xavfli TCP ulanishini shifrlangan, autentifikatsiyalangan kanalga aylantiruvchi muzokaralar. TLS 1.3 uni bitta round-trip ga soddalashtirdi. Bu dars har bir xabarni tahlil qiladi.",
        theory:
          "TLS maxfiylik (shifrlash), yaxlitlik (AEAD shifrlar) va autentifikatsiya (sertifikatlar) ta'minlaydi. 1.3 handshake: mijoz qo'llab-quvvatlanadigan shifr to'plamlari, kalit ulushi (vaqtinchalik Diffie-Hellman ochiq kaliti) va kengaytmalar bilan ClientHello yuboradi. Server ServerHello (tanlangan to'plam, uning kalit ulushi), so'ng — endi shifrlangan — Certificate, CertificateVerify (shaxsiy kalitga egaligini isbotlovchi imzo) va Finished bilan javob beradi. Ikkala tomon ham HKDF kalit jadvali orqali DH almashinuvidan bir xil sessiya kalitlarini oladi. TLS 1.3 RSA kalit almashinuvini, statik DH ni va zaif shifrlarni olib tashladi va forward secrecy ni majburiy qildi.",
        realWorldArchitecture:
          "TLS odatda chekka da — CDN, load balancer yoki teskari proksi da — yakunlanadi, u sertifikat va shaxsiy kalitni saqlaydi. Orqa tomonga trafik qayta shifrlangan (service mesh ichida mTLS) yoki ishonchli segment ichida oddiy matnda yuborilishi mumkin. Sessiyani tiklash (PSK ticketlari) va 0-RTT qaytuvchi mijozlarga round-tripni o'tkazib yuborishga imkon beradi.",
        packetFlow:
          "TCP handshake dan keyin: ClientHello → ServerHello → {EncryptedExtensions, Certificate, CertificateVerify, Finished} → Finished. Ilova ma'lumotlari mijozning Finished dan keyin oqishi mumkin — bitta round-trip. 0-RTT bilan mijoz ma'lumotlarni birinchi uchishda yuboradi.",
        securityImplications:
          "Forward secrecy (vaqtinchalik DH) kelajakdagi shaxsiy kalit buzilishi o'tgan trafikni parolini ocholmasligini anglatadi. 0-RTT ma'lumotlari takrorlanishi mumkin va faqat idempotent bo'lishi kerak. Pasaytirish hujumlari eski TLS/shifr versiyalarini majburlashga urinadi — TLS 1.3 pasaytirish sentinellarini o'z ichiga oladi. Zaif yoki buzilgan CA butun ishonch zanjirini buzadi.",
        attackVectors: [
          {
            name: "Protokolni pasaytirish",
            description:
              "Yo'ldagi tajovuzkor TLS 1.3 qo'llab-quvvatlashini olib tashlab, zaif eski versiya yoki shifrni majburlaydi.",
            severity: "High",
          },
          {
            name: "0-RTT takrorlash",
            description: "0-RTT da yuborilgan erta ma'lumotlar tajovuzkor tomonidan ushlanib takrorlanishi mumkin.",
            severity: "Medium",
          },
        ],
        configExamples: [
          {
            language: "bash",
            description: "Server TLS handshake va sertifikatini tekshirish.",
            code: "openssl s_client -connect example.com:443 -tls1_3 -servername example.com\n# Tekshiring: Cipher, Server certificate, Verify return code",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Qo'llab-quvvatlanadigan TLS versiyalari va shifrlarni sanab o'tish.",
            code: "nmap --script ssl-enum-ciphers -p 443 example.com",
          },
        ],
        wiresharkAnalysis:
          "`tls.handshake` ga filtrlang. ClientHello va ServerHello ni aniq matnda ko'rasiz; ServerHello kalit ulushidan keyin hamma narsa shifrlangan. TLS 1.3 ni tasdiqlash uchun `Supported Versions` va `Key Share` kengaytmalarini tekshiring.",
        diagrams: [
          {
            type: "mermaid",
            title: "TLS 1.3 bir round-trip handshake",
            content:
              "sequenceDiagram\n  Client->>Server: ClientHello + key_share\n  Server->>Client: ServerHello + key_share\n  Server->>Client: {Certificate, CertVerify, Finished}\n  Client->>Server: {Finished}\n  Client->>Server: Ilova Ma'lumotlari",
          },
        ],
        summary:
          "TLS 1.3 majburiy forward secrecy uchun vaqtinchalik Diffie-Hellman ishlatib bir round-tripda shifrlangan, autentifikatsiyalangan kanal o'rnatadi. Sertifikatlar serverni autentifikatsiya qiladi; HKDF kalitlarni hosil qiladi; 0-RTT round-tripni takrorlash xavfiga almashtiradi.",
      }
    ),
    buildLesson("http-tls", "http-headers", "HTTP Sarlavhalari", "Beginner", "22m", "HTTP sarlavhalari"),
    buildLesson("http-tls", "cookies", "Cookie-lar", "Beginner", "20m", "HTTP cookie-lari"),
    buildLesson("http-tls", "sessions", "Sessiyalar", "Intermediate", "22m", "veb sessiyalar"),
    buildLesson("http-tls", "authentication", "Autentifikatsiya", "Intermediate", "28m", "veb autentifikatsiyasi"),
    buildLesson("http-tls", "authorization", "Avtorizatsiya", "Intermediate", "25m", "avtorizatsiya"),
    buildLesson("http-tls", "https", "HTTPS", "Beginner", "20m", "HTTPS"),
    buildLesson("http-tls", "ssl", "SSL — Tarixi va Merosi", "Intermediate", "18m", "SSL"),
    buildLesson("http-tls", "tls", "TLS — Transport Qatlami Xavfsizligi", "Intermediate", "25m", "TLS"),
    buildLesson("http-tls", "ssl-handshake", "SSL/TLS 1.2 Handshake", "Advanced", "30m", "TLS 1.2 handshake"),
    buildLesson("http-tls", "certificates", "X.509 Sertifikatlari", "Intermediate", "25m", "X.509 sertifikatlari"),
    buildLesson("http-tls", "certificate-authorities", "Sertifikat Markazlari", "Intermediate", "20m", "sertifikat markazlari"),
    buildLesson("http-tls", "pki", "Ochiq Kalit Infratuzilmasi (PKI)", "Advanced", "28m", "PKI"),
    buildLesson("http-tls", "rsa", "RSA Kriptografiyasi", "Advanced", "28m", "RSA"),
    buildLesson("http-tls", "aes", "AES Simmetrik Shifrlash", "Advanced", "25m", "AES"),
    buildLesson("http-tls", "diffie-hellman", "Diffie-Hellman Kalit Almashinuvi", "Advanced", "25m", "Diffie-Hellman"),
    buildLesson("http-tls", "hsts", "HSTS", "Intermediate", "15m", "HSTS"),
    buildLesson("http-tls", "csp", "Kontent Xavfsizlik Siyosati (CSP)", "Intermediate", "22m", "CSP"),
    buildLesson("http-tls", "sop", "Bir Xil Kelib Chiqish Siyosati", "Intermediate", "20m", "Same-Origin Policy"),
    buildLesson("http-tls", "cors", "CORS", "Intermediate", "25m", "CORS"),
    buildLesson("http-tls", "http2", "HTTP/2", "Intermediate", "25m", "HTTP/2"),
    buildLesson("http-tls", "http3", "HTTP/3", "Advanced", "25m", "HTTP/3"),
    buildLesson("http-tls", "quic", "QUIC", "Advanced", "28m", "QUIC"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 3 — WEB SERVERS                                                 */
/* ----------------------------------------------------------------------- */

const section3: CourseSection = {
  id: "web-servers",
  title: "Web Serverlar",
  description:
    "Asosiy veb serverlarni solishtiring va boshqaring — Apache, NGINX, IIS, Caddy va Tomcat — arxitekturalari, konfiguratsiyasi va xavfsizlikni mustahkamlash.",
  icon: "Server",
  color: "#8800ff",
  totalDuration: "4h 45m",
  lessons: [
    buildLesson(
      "web-servers",
      "nginx",
      "NGINX",
      "Intermediate",
      "30m",
      "NGINX veb server",
      {
        introduction:
          "NGINX — dunyo ning eng band saytlarining katta qismini quvvatlaydigan hodisaga asoslangan veb server, teskari proksi va load balancer. Uning asinxron arxitekturasi ishlash samaradorligining kalitidir.",
        theory:
          "Har ulanish uchun bir oqim modelidan farqli o'laroq, NGINX epoll/kqueue orqali minglab ulanishlarni multiplekslaydi, kichik ishchi jarayonlar to'plamini ishlatadi. Bu xotirani tekis ushlab turadi va yuqori bir vaqtlilikda kontekst almashinuvi xarajatlaridan qochadi (C10k muammosi). Konfiguratsiya deklarativ: http bloki server bloklarini (virtual hostlar) o'z ichiga oladi, ular URI bo'yicha mos keladigan location bloklarini o'z ichiga oladi.",
        realWorldArchitecture:
          "NGINX odatda old eshik: TLS ni yakunlash, statik aktivlarni xizmat qilish va dinamik so'rovlarni upstream bloki orqali ilova serverlariga (PHP-FPM, Node, Gunicorn) teskari proksi qilish. U upstreamlar bo'ylab yukni taqsimlaydi, javoblarni keshlaydi, tezlikni cheklaydi va sarlavhalarni qayta yozadi. NGINX Plus va ochiq manba versiyasi API gateway sifatida ham ishlaydi.",
        packetFlow:
          "Mijoz 443 portiga ulanadi. NGINX ishchida socketni qabul qiladi, TLS handshake ni yakunlaydi, HTTP so'rovini tahlil qiladi, server va location blokiga mos keladi va fayl xizmat ko'rsatadi yoki backendga upstream ulanish ochib, javobni qaytarib o'tkazadi — ko'pincha uni keshlaydi.",
        securityImplications:
          "Noto'g'ri sozlangan location mos kelishi fayllarni ochib qo'yishi mumkin (masalan, alias yo'l kesib o'tish). Etishmayotgan `proxy_pass` sarlavha gigyenasi ichki hostlarni oshkor qilishi mumkin. NGINX imtiyozsiz foydalanuvchi sifatida ishlashi, versiya banneri ni o'chirishi, TLS sozlamalarini qo'llashi va floodlarni to'mtoqlash uchun `limit_req` qo'llashi kerak.",
        configExamples: [
          {
            language: "nginx",
            description: "Mustahkamlangan teskari proksi server bloki.",
            code: "server {\n  listen 443 ssl;\n  server_name app.example.com;\n  ssl_certificate     /etc/ssl/app.crt;\n  ssl_certificate_key /etc/ssl/app.key;\n  ssl_protocols TLSv1.2 TLSv1.3;\n  add_header Strict-Transport-Security \"max-age=63072000\" always;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    limit_req zone=api burst=20 nodelay;\n  }\n}",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Konfiguratsiyani xavfsiz tekshirish va qayta yuklash.",
            code: "nginx -t            # konfiguratsiyani tekshirish\nnginx -s reload     # muammosiz qayta yuklash\nsystemctl status nginx",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "NGINX teskari proksi sifatida",
            content:
              "graph LR\n  C[Mijozlar] --> N[NGINX :443]\n  N -->|statik| F[(Fayl tizimi)]\n  N -->|/api| A1[Ilova :3000]\n  N -->|/api| A2[Ilova :3001]",
          },
        ],
        summary:
          "NGINX tekis xotira bilan massiv bir vaqtlilikni boshqarish uchun hodisaga asoslangan ishchi modelidan foydalanadi. TLS ni yakunlovchi teskari proksi, statik server va load balancer sifatida ajralib turadi; mustahkamlash location moslashtirish, sarlavhalar va tezlikni cheklashga qaratilgan.",
      }
    ),
    buildLesson(
      "web-servers",
      "apache",
      "Apache HTTP Server",
      "Intermediate",
      "28m",
      "Apache veb server",
      {
        introduction:
          "Apache HTTP Server — veb serverlarning faxriysi — cheksiz modulli va sozlanishi mumkin. Uning Ko'p Jarayon Modullarini (MPM) tushunish uni yaxshi boshqarishning kalitidir.",
        theory:
          "Apache ning xatti-harakati MPM bilan belgilanadi. `prefork` har ulanish uchun bitta jarayondan foydalanadi (klassik mod_php kabi thread-safe bo'lmagan modullar bilan xavfsiz, lekin xotirani ko'p iste'mol qiladi). `worker` jarayonlar ichida threadlardan foydalanadi. `event` (zamonaviy standart) keep-alive bo'sh vaqtida ishchi threadlarni ozod qilib, NGINX ga o'xshash bir vaqtlilikka yaqinlashadi. Funksionallik modullar orqali qo'shiladi (mod_rewrite, mod_ssl, mod_security).",
        realWorldArchitecture:
          "Apache umumiy xosting va LAMP stacklarida, `.htaccess` katalog darajasidagi ustmalarni qadrlashda keng tarqalgan. U ko'pincha statik keshlash uchun NGINX yoki CDN tomonidan old tomonda joylashtiriladi, Apache esa mod_php yoki PHP-FPM orqali dinamik PHP ni boshqaradi.",
        packetFlow:
          "Ulanish faol MPM tomonidan qabul qilinadi, jarayon/threadga yo'naltiriladi, so'rov tahlil qilinadi, sozlangan ishlovchilar va modullar so'rov qayta ishlash bosqichlarida ishlaydi va javob yaratiladi.",
        securityImplications:
          "`.htaccess` moslashuvchanligi ham xavfdir — u katalog darajasidagi konfiguratsiya siljishiga imkon beradi. ServerTokens/ServerSignature orqali ma'lumot oshkor qilish, mod_autoindex orqali katalog ro'yxati va eskirgan modullar keng tarqalgan topilmalar. mod_security WAF qatlamini qo'shadi.",
        configExamples: [
          {
            language: "apache",
            description: "Mustahkamlangan virtual host.",
            code: "<VirtualHost *:443>\n  ServerName app.example.com\n  SSLEngine on\n  SSLCertificateFile /etc/ssl/app.crt\n  SSLProtocol -all +TLSv1.2 +TLSv1.3\n  ServerTokens Prod\n  ServerSignature Off\n  <Directory /var/www/app>\n    Options -Indexes\n    AllowOverride None\n    Require all granted\n  </Directory>\n</VirtualHost>",
          },
        ],
        summary:
          "Apache — modulli, etuk veb server; MPM tanlovi (prefork/worker/event) bir vaqtlilik va xotira xatti-harakatini belgilaydi. Mustahkamlash .htaccess tarqalishini, ma'lumot oshkor qilishni va modul joriyligini maqsad qilib oladi.",
      }
    ),
    buildLesson(
      "web-servers",
      "caddy",
      "Caddy",
      "Beginner",
      "22m",
      "Caddy veb server",
      {
        introduction:
          "Caddy — asosiy xususiyati to'liq avtomatik HTTPS bo'lgan zamonaviy veb server — u nol konfiguratsiya bilan TLS sertifikatlarini oladi va yangilaydi.",
        theory:
          "Caddy Go da yozilgan, bitta statik binary sifatida etkaziladi va Let's Encrypt yoki ZeroSSL dan sertifikatlarni avtomatik ta'minlash uchun ACME protokolidan foydalanadi. Uning konfiguratsiyasi (Caddyfile) ataylab minimal va u qayta ishga tushirmasdan dinamik qayta konfiguratsiya uchun JSON konfiguratsiya API sini ochadi.",
        realWorldArchitecture:
          "Caddy operatsion soddalik muhim bo'lgan kichik-o'rta joylashuvlar, ichki vositalar va chekka tugunlarga mos keladi. U statik saytlarga xizmat ko'rsatadi, ilovalarga teskari proksi qiladi va sertifikat hayot davrini avtomatik boshqaradi — muddati o'tgan sertifikat uzilishlarining butun sinfini bartaraf etadi.",
        packetFlow:
          "Hostname uchun birinchi so'rovda Caddy domen nazoratini isbotlash uchun ACME muammosini (HTTP-01 yoki TLS-ALPN-01) bajaradi, sertifikat oladi, uni keshlaydi va TLS xizmati ko'rsatadi. Yangilanishlar muddati tugashidan ancha oldin fonda amalga oshiriladi.",
        securityImplications:
          "Avtomatik HTTPS sertifikat boshqaruvidan inson xatosini olib tashlaydi. Caddy xavfsiz TLS sozlamalarini standart qilib belgilaydi. Asosiy xavflar admin API ni ochish va talabga binoan keng TLS bo'lib, tajovuzkor ko'plab ACME so'rovlarini ishga tushirish uchun suiiste'mol qilishi mumkin.",
        configExamples: [
          {
            language: "caddy",
            description: "Avtomatik HTTPS bilan to'liq Caddyfile.",
            code: "app.example.com {\n  reverse_proxy 127.0.0.1:3000\n  encode gzip zstd\n  header Strict-Transport-Security \"max-age=31536000\"\n}",
          },
        ],
        summary:
          "Caddy — avtomatik, ACME boshqaradigan HTTPS va minimal konfiguratsiya bilan belgilangan Go asosidagi server. U nozik nazoratni operatsion soddalik va standart bo'yicha xavfsiz xatti-harakat bilan almashtiradi.",
      }
    ),
    buildLesson("web-servers", "iis", "Microsoft IIS", "Intermediate", "25m", "Microsoft IIS veb server"),
    buildLesson("web-servers", "tomcat", "Apache Tomcat", "Intermediate", "25m", "Apache Tomcat veb server"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 4 — SERVER INFRASTRUCTURE                                       */
/* ----------------------------------------------------------------------- */

const section4: CourseSection = {
  id: "server-infrastructure",
  title: "Server Infratuzilmasi",
  description:
    "Bare metaldan cloudgacha, firewalllardan service mesh gacha — zamonaviy ilovalarni xosting va himoya qiladigan infratuzilmani tushuning.",
  icon: "HardDrive",
  color: "#00ff88",
  totalDuration: "9h 00m",
  lessons: [
    buildLesson(
      "server-infrastructure",
      "iptables",
      "iptables bilan Linux Firewall",
      "Advanced",
      "32m",
      "iptables",
      {
        introduction:
          "iptables — Linux kernelining netfilter paket filtrlash freymworkiga klassik interfeys. nftables yoki UFW ishlatilgan joylarda ham ular oxir-oqibat bir xil kernel hooklarini boshqaradi — shuning uchun iptables ni tushunish asosiy.",
        theory:
          "netfilter paket kerneldan o'tayotganda hooklar ochadi. iptables qoidalarni jadvallar (filter, nat, mangle, raw) va zanjirlar (INPUT, OUTPUT, FORWARD, PREROUTING, POSTROUTING) ga tartiblashtiradi. Paket tegishli zanjiridagi qoidalarga tartib bilan mos keltiriladi; birinchi mos keladigan qoidaning maqsadi (ACCEPT, DROP, REJECT yoki sakrash) uning taqdirini hal qiladi. Hech qanday qoida mos kelmasa, zanjirning standart siyosati qo'llaniladi. Ulanishni kuzatish (conntrack) firewallni holatli qiladi — u har qoidani qayta baholamasdan ESTABLISHED ulanishlarga tegishli paketlarni ACCEPT qilishi mumkin.",
        realWorldArchitecture:
          "Server firewall INPUT da standart-DROP belgilaydi, loopback ga ruxsat beradi, ESTABLISHED/RELATED ga ruxsat beradi, so'ng kerakli xizmatlarni (SSH, HTTPS) aniq ruxsatlaydi. PREROUTING/POSTROUTING dagi NAT qoidalari port yo'naltirish va masqueradni amalga oshiradi. Bulut muhitlarida host iptables xavfsizlik guruhlari va tarmoq ACL larini to'ldiradi (almashtirmaydi).",
        packetFlow:
          "Kiruvchi paket PREROUTING ga (raw, so'ng conntrack, so'ng mangle, so'ng nat) etib boradi. Yo'naltirish qarori mahalliy manzilli paketlarni INPUT ga va tranzit paketlarni FORWARD ga yuboradi. Mahalliy yaratilgan paketlar OUTPUT so'ng POSTROUTING dan o'tadi. filter jadvalining INPUT/FORWARD/OUTPUT zanjirlar qabul/tushirish qarorini qabul qiladi.",
        securityImplications:
          "Haddan tashqari ruxsatli standart siyosat, qoida tartiblash xatolari (aniq DROP dan oldin keng ACCEPT) yoki IPv6 ni unutish (ip6tables alohida) barchasi teshiklar yaratadi. Holat qoidalari bo'lishi kerak yoki qonuniy qaytish trafiki bloklanadi. Qoidalar saqlangan bo'lmasa qayta ishga tushirishda saqlanmaydi.",
        configExamples: [
          {
            language: "bash",
            description: "Minimal holatli host firewall.",
            code: "iptables -P INPUT DROP\niptables -P FORWARD DROP\niptables -A INPUT -i lo -j ACCEPT\niptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\niptables -A INPUT -p tcp --dport 22 -j ACCEPT\niptables -A INPUT -p tcp --dport 443 -j ACCEPT",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Qoidalarni tekshirish va saqlash.",
            code: "iptables -L -n -v --line-numbers\niptables-save > /etc/iptables/rules.v4",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Netfilter orqali paket yo'li",
            content:
              "graph LR\n  IN[Paket kirdi] --> PRE[PREROUTING]\n  PRE --> RT{Yo'naltirish}\n  RT -->|mahalliy| INP[INPUT]\n  RT -->|tranzit| FWD[FORWARD]\n  FWD --> POST[POSTROUTING]\n  INP --> APP[Mahalliy jarayon]",
          },
        ],
        summary:
          "iptables jadvallar va zanjirlar orqali netfilter hooklarini boshqaradi. To'g'ri host firewall standart-DROP, loopback va ESTABLISHED trafikka ruxsat beradi, so'ng xizmatlarni oq ro'yxatga kiritadi. conntrack orqali holatlilik va qoida tartibi xatolar sodir bo'ladigan joydir.",
      }
    ),
    buildLesson(
      "server-infrastructure",
      "ssh",
      "SSH — Xavfsiz Shell",
      "Intermediate",
      "30m",
      "SSH",
      {
        introduction:
          "SSH — masofaviy boshqarish, fayl uzatish va tunnellash uchun shifrlangan protokol. U deyarli har bir serverning old eshigi bo'lib, uni mustahkamlash xavfsizlik ustuvorligiga aylanadi.",
        theory:
          "SSH TCP/22 orqali shifrlangan, autentifikatsiyalangan kanal ta'minlaydi. Handshake sessiya kalitlarini olish uchun kalit almashinuv algoritmini (odatda ECDH/curve25519) kelishib oladi, so'ng server host kaliti orqali va mijoz parol yoki — afzalroq — ochiq kalit kriptografiyasi orqali autentifikatsiyalanadi. Mijoz server authorized_keys da ochiq yarmi bo'lgan shaxsiy kalitga egaligini isbotlaydi. Bir necha mantiqiy kanallar (shell, port yo'naltirish, SFTP) bitta ulanish ustida multiplekslanadi.",
        realWorldArchitecture:
          "Ishlab chiqarish kirishi kalit asosidagi autentifikatsiyadan (parollar o'chirilgan) foydalanadi, ko'pincha SSH ga ochiq yagona tizim bo'lgan bastion/sakrash xost orqali. Kalitlar SSH CA tomonidan berilgan qisqa muddatli sertifikatlar bo'lishi mumkin. Agent yo'naltirish, ProxyJump va konfiguratsiya fayllari ko'p hopli kirishni soddalashtiradi. Sessiyani yozib olish va MFA javobgarlikni oshiradi.",
        packetFlow:
          "22 da TCP handshake → SSH versiya almashinuvi → algoritm kelishuvi → ECDH kalit almashinuvi va host kalitini tekshirish → foydalanuvchi autentifikatsiyasi → kanal so'rovlari (pty, exec, port yo'naltirish uchun direct-tcpip). Kalit almashinuvidan keyin barcha yuk shifrlangan va yaxlitlik bilan himoyalangan.",
        securityImplications:
          "Ommaviy Internetdagi SSH doimiy ravishda kuch bilan sinab ko'riladi. Parol autentifikatsiyasi, zaif kalitlar, root kirish va eskirgan authorized_keys asosiy xavflar. Buzilgan agent yo'naltirish buzilgan hostga kalitlaringizni o'g'irlashga imkon berishi mumkin. Host kaliti o'zgarishlari o'rtadagi odamni ko'rsatishi mumkin.",
        configExamples: [
          {
            language: "bash",
            description: "Mustahkamlangan sshd_config direktivlari.",
            code: "PermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nKexAlgorithms curve25519-sha256\nAllowUsers deploy admin\nMaxAuthTries 3",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Kalit yaratish va bastion orqali sakrash.",
            code: "ssh-keygen -t ed25519 -C 'deploy@laptop'\nssh -J bastion.example.com deploy@10.0.1.20",
          },
        ],
        summary:
          "SSH shifrlangan, o'zaro autentifikatsiyalangan admin kanalini ta'minlaydi. Kalit (yoki sertifikat) autentifikatsiyasidan foydalaning, parollar va root kirishni o'chiring, kirishni bastion bilan kuchaytiring va MITM uchun host kaliti o'zgarishlarini kuzating.",
      }
    ),
    buildLesson(
      "server-infrastructure",
      "load-balancing",
      "Yukni Taqsimlash",
      "Intermediate",
      "28m",
      "yukni taqsimlash",
      {
        introduction:
          "Yukni taqsimlash trafikni ko'plab serverlar bo'ylab tarqatib, masshtablilik, yuqori mavjudlik va nol vaqt ichida joylashtirishga erishadi. U har bir chidamli arxitekturaning burchak toshi.",
        theory:
          "Load balancer 4-qatlamda (transport — IP/port bo'yicha yo'naltirish, tez va protokolga mustaqil) yoki 7-qatlamda (ilova — HTTP host, yo'l, sarlavhalar bo'yicha yo'naltirish, aqlli xususiyatlarni yoqish) ishlaydi. Algoritmlar round-robin, eng kam ulanishlar, og'irlikli, IP-hash (yopishqoqlik uchun) va EWMA kechikish asosidagi. Sog'liq tekshiruvlari nosog'lom backendlarni olib tashlaydi. Sessiya yaqinligi ('yopishqoq sessiyalar') holat mahalliy bo'lganda foydalanuvchini bitta backendga qadalib qoldirib turadi.",
        realWorldArchitecture:
          "Bulut load balancerlari (AWS ALB/NLB, GCP LB) bir necha mavjudlik zonalari bo'ylab avtomatik masshtablash guruhlari oldida joylashadi. Global load balancer foydalanuvchilarni eng yaqin mintaqaga yo'naltirish uchun DNS yoki anycastdan foydalanadi. Ichki tomondan, service meshlari mikroservislar o'rtasida sharq-g'arb trafikni taqsimlaydi. Ko'k-yashil va canary joylashuvlar load-balancer og'irliklarini siljitish orqali amalga oshiriladi.",
        packetFlow:
          "L4: LB paketni tanlangan backendga yo'naltiradi yoki NAT qiladi; backend to'g'ridan-to'g'ri mijozga (DSR) yoki LB orqali javob berishi mumkin. L7: LB mijoz TCP/TLS ulanishini yakunlaydi, HTTP ni tahlil qiladi, qoidalar bo'yicha backend tanlaydi va unga o'z ulanishini ochadi — ulanishlarni hovuzda saqlash, qayta urinish va qayta yozishga imkon beradi.",
        securityImplications:
          "Load balancer TLS yakunlash nuqtasi va yuqori qimmatli nishon. U shuningdek WAF qoidalari, tezlikni cheklash va DDoS so'rilishini qo'llash uchun tabiiy joy. Noto'g'ri sozlangan sog'liq tekshiruvlari kaskadli nosozliklarga olib kelishi mumkin; yopishqoq sessiyalar hotspotlar va notekis yuk yaratishi mumkin.",
        diagrams: [
          {
            type: "mermaid",
            title: "AZ lar bo'ylab L7 yukni taqsimlash",
            content:
              "graph TD\n  C[Mijozlar] --> LB[L7 Load Balancer]\n  LB --> A[Backend AZ-a]\n  LB --> B[Backend AZ-b]\n  LB --> D[Backend AZ-c]",
          },
        ],
        summary:
          "Yukni taqsimlash masshtab va mavjudlik uchun trafikni tarqatadi. L4 tez va umumiy; L7 HTTP ga mos va funksiyalarga boy. Sog'liq tekshiruvlari, algoritmlar va yaqinlik moslashtirilishi kerak; LB shuningdek ideal TLS/WAF qo'llash nuqtasi.",
      }
    ),
    buildLesson("server-infrastructure", "dedicated-server", "Dedicated Serverlar", "Beginner", "18m", "dedicated serverlar"),
    buildLesson("server-infrastructure", "vps", "Virtual Private Serverlar (VPS)", "Beginner", "18m", "VPS xosting"),
    buildLesson("server-infrastructure", "cloud-computing", "Bulut Hisoblash", "Beginner", "22m", "bulut hisoblash"),
    buildLesson("server-infrastructure", "aws", "Amazon Web Services (AWS)", "Intermediate", "28m", "AWS"),
    buildLesson("server-infrastructure", "azure", "Microsoft Azure", "Intermediate", "25m", "Microsoft Azure"),
    buildLesson("server-infrastructure", "gcp", "Google Cloud Platform", "Intermediate", "25m", "Google Cloud Platform"),
    buildLesson("server-infrastructure", "linux-networking", "Linux Tarmoqlash", "Intermediate", "28m", "Linux tarmoqlash"),
    buildLesson("server-infrastructure", "firewalls", "Firewalllar", "Intermediate", "25m", "firewalllar"),
    buildLesson("server-infrastructure", "ufw", "UFW — Oddiy Firewall", "Beginner", "15m", "UFW"),
    buildLesson("server-infrastructure", "vpn", "VPN-lar", "Intermediate", "28m", "VPN-lar"),
    buildLesson("server-infrastructure", "reverse-proxy", "Teskari Proksilar", "Intermediate", "22m", "teskari proksilar"),
    buildLesson("server-infrastructure", "cdn", "Kontent Yetkazib Berish Tarmoqlari", "Intermediate", "25m", "CDN-lar"),
    buildLesson("server-infrastructure", "haproxy", "HAProxy", "Advanced", "25m", "HAProxy"),
    buildLesson("server-infrastructure", "docker-networking", "Docker Tarmoqlash", "Advanced", "28m", "Docker tarmoqlash"),
    buildLesson("server-infrastructure", "kubernetes-networking", "Kubernetes Tarmoqlash", "Advanced", "32m", "Kubernetes tarmoqlash"),
    buildLesson("server-infrastructure", "service-mesh", "Xizmat To'ri (Service Mesh)", "Advanced", "28m", "service mesh"),
    buildLesson("server-infrastructure", "zero-trust", "Nol Ishonch Arxitekturasi", "Advanced", "28m", "Zero Trust"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 5 — SOFTWARE ARCHITECTURE                                       */
/* ----------------------------------------------------------------------- */

const section5: CourseSection = {
  id: "software-architecture",
  title: "Dasturiy Ta'minot Arxitekturasi",
  description:
    "Tizimlar qanday scale, fail va evolve bo'lishini belgilaydigan arxitektura stillar — monolitlar, mikroservislar, serverless, hodisaga asoslangan va gibrid dizaynlar.",
  icon: "Boxes",
  color: "#0088ff",
  totalDuration: "4h 30m",
  lessons: [
    buildLesson(
      "software-architecture",
      "microservices",
      "Mikroservislar Arxitekturasi",
      "Advanced",
      "32m",
      "mikroservislar",
      {
        introduction:
          "Mikroservislar ilovani kichik, mustaqil joylashtirilishi mumkin bo'lgan xizmatlar to'plami sifatida tuzib, har biri bitta biznes qobiliyatiga egalik qiladi. Bu uslub operatsion murakkablikni tashkiliy va masshtablash epchilligi bilan almashtiradi.",
        theory:
          "Har bir mikroservisning o'z kodlar bazasi, ma'lumotlar ombori va joylash hayot davri bor va boshqalar bilan tarmoq orqali — sinxron ravishda HTTP/gRPC yoki asinxron ravishda xabar almashish orqali muloqot qiladi. Xizmatlar biznes domenlaridan (cheklangan kontekstlar) atrofida tashkil etilgan. Ajratish jamoalarga mustaqil joylashtirishga va issiq xizmatlarni izolyatsiyada masshtablashga imkon beradi, lekin jarayondagi funksiya chaqiruvlarini kechikish, qisman nosozlik va CAP teoremasiga bog'liq tarmoq chaqiruvlariga aylantiradi.",
        realWorldArchitecture:
          "Mikroservislar platformasi odatda API gateway (chekka yo'naltirish, autentifikatsiya), xizmat kashfiyoti, service mesh (mTLS, qayta urinishlar, kuzatuvchanlik), xizmat boshiga ma'lumotlar bazalari, xabar brokeri (Kafka, RabbitMQ), markazlashtirilgan jurnallash/kuzatish va konteyner orkestratori (Kubernetes) ni o'z ichiga oladi. Chidamlilik naqshlari — vaqt chegaralari, backoff bilan qayta urinishlar, elektr uzgichlar, to'siq devorlar — majburiy, ixtiyoriy emas.",
        packetFlow:
          "Mijoz so'rovi API gateway ga kiradi, u uni autentifikatsiya qiladi va A xizmatiga yo'naltiradi. A xizmati B va C xizmatlarini chaqirishi mumkin; har bir chaqiruv yangi TLS ulanimi (yoki mesh boshqaradigan). Tarqatilgan iz ID har bir hop orqali tarqatiladi, shunda butun tranzaksiya qayta tiklanuvchan.",
        securityImplications:
          "Tarmoq endi hujum yuzasi: har bir xizmatlar arasi chaqiruv autentifikatsiyalanishi va shifrlangan (mTLS) bo'lishi kerak — klaster ichida 'nol ishonch'. Ko'proq xizmatlar ko'proq endpointlar, ko'proq sirlar va ko'proq yamoq uchun bog'liqliklarni anglatadi. Buzilgan bitta xizmatning portlash radiusi faqat segmentatsiya va minimal imtiyoz bilan cheklangan.",
        attackVectors: [
          {
            name: "Xizmatlar o'rtasida yon harakat",
            description:
              "Keng tarmoq erishuviga va haddan tashqari keng hisob ma'lumotlariga ega buzilgan xizmat boshqalarga o'tadi.",
            severity: "High",
          },
          {
            name: "Kaskadli nosozlik",
            description:
              "Bitta sekin xizmat chaqiruvchi threadlarni tugaturib, elektr uzgichlarsiz nosozlikni tizim bo'ylab tarqatadi.",
            severity: "Medium",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Mikroservislar so'rov oqimi",
            content:
              "graph TD\n  C[Mijoz] --> GW[API Gateway]\n  GW --> A[Buyurtmalar Xizmati]\n  A --> B[Inventar Xizmati]\n  A --> D[To'lov Xizmati]\n  B --> DB1[(Inventar MB)]\n  D --> DB2[(To'lov MB)]",
          },
        ],
        summary:
          "Mikroservislar = tarmoq orqali muloqot qiluvchi mustaqil joylashtirilishi mumkin, domen ga mos xizmatlar. Ular tarqatilgan tizimlar murakkabligi hisobiga jamoa va masshtablash mustaqilligini yoqadi, mTLS, chidamlilik naqshlari va kuchli kuzatuvchanlikni talab qiladi.",
      }
    ),
    buildLesson(
      "software-architecture",
      "monolith",
      "Monolit Arxitektura",
      "Beginner",
      "22m",
      "monolit arxitektura",
      {
        introduction:
          "Monolit — bitta birlik sifatida qurilgan va joylashtirilgan ilova. Uzoq vaqt modadan chiqqan, u ko'p loyihalar uchun to'g'ri standart bo'lib qolmoqda — va yaxshi tuzilgan monolit har safar yomon tuzilgan mikroservislar uyumini mag'lub etadi.",
        theory:
          "Monolitda barcha modullar (UI, biznes logikasi, ma'lumotlarga kirish) bitta jarayon va bitta joylash artefaktida ishlaydi. Modullar o'rtasidagi chaqiruvlar tez, jarayondagi funksiya chaqiruvlari — tarmoq yo'q, serializatsiya yo'q, qisman nosozlik yo'q. Bitta ma'lumotlar bazasi oson tranzaksiyalar va birlashtirishlarni anglatadi. Munosib kelishim: butun ilova birlik sifatida masshtablanadi, bitta xato hamma narsani ishdan chiqarishi mumkin va katta kodlar bazasi intizom bo'lmasa zich bog'liq ('loyqa to'p') bo'lib qolishi mumkin.",
        realWorldArchitecture:
          "Monolit gorizontal masshtablash va mavjudlik uchun bitta ma'lumotlar bazasini (ko'pincha o'qish replikalari bilan) ulashadigan bir necha bir xil nusxalar sifatida load balancer ortida joylashtiriladi. 'Modulli monolit' ichki modul chegaralarini qo'llaydi, haqiqiy ehtiyoj yuzaga kelsa xizmatni keyinroq chiqarish imkoniyatini ochiq saqlaydi.",
        packetFlow:
          "Mijoz so'rovi load balancerga etib boradi, bitta nusxaga tushadi va bitta javob qaytarilishidan oldin butunlay o'sha jarayon ichida — yo'naltirish, biznes logikasi va ma'lumotlar bazasiga kirish — boshqariladi. Ichki tarmoq hoplari yo'q.",
        securityImplications:
          "Hujum yuzasi kichikroq va oddiyroq — bitta jarayon, bog'liqliklarning bitta to'plami, yamash uchun bitta joylash. Lekin ichki segmentatsiya yo'q: masofaviy-kod-bajarish kamchiligi bir vaqtning o'zida butun ilovani va uning ma'lumotlar bazasi hisob ma'lumotlarini buzadi.",
        diagrams: [
          {
            type: "mermaid",
            title: "Masshtablangan monolit",
            content:
              "graph TD\n  C[Mijozlar] --> LB[Load Balancer]\n  LB --> M1[Monolit Nusxa 1]\n  LB --> M2[Monolit Nusxa 2]\n  M1 --> DB[(Umumiy MB)]\n  M2 --> DB",
          },
        ],
        summary:
          "Monolit — bitta joylash birligi: oddiy, ichkarida tez, haqida mulohaza yuritish oson, kichik hujum yuzasi bilan. Uning chegaralari birlik masshtablash va bog'liqlik — ikkalasi ham intizomli modulli tuzilma bilan boshqariladigan.",
      }
    ),
    buildLesson(
      "software-architecture",
      "serverless",
      "Serverless Arxitektura",
      "Intermediate",
      "28m",
      "serverless arxitektura",
      {
        introduction:
          "Serverless serverlarni boshqarmasdan kod ishlatishga imkon beradi. Siz funksiyalarni joylashtirasiz; bulut provayderi ta'minlash, masshtablash va yamoqni boshqaradi, faqat haqiqiy bajarish vaqti uchun hisob-kitob qiladi.",
        theory:
          "Funksiya-xizmat-sifatida (FaaS — AWS Lambda, Azure Functions, Cloud Functions) qisqa muddatli, holatsiz, hodisaga tetiklangan funksiyalarni bajaradi. Provayderlar ularni noldan minglab bir vaqtli nusxalargacha avtomatik masshtablaydi. 'Serverless' kengroq ma'noda boshqariladigan ma'lumotlar bazalari, navbatlar va saqlashni ham qamrab oladi. Asosiy cheklovlar: funksiyalar holatsiz (holat tashqi omborlarda yashaydi), bajarish vaqti chegaralariga ega va 'sovuq ishga tushirish' dan aziyat chekadi — yangi nusxa ishga tushirilishi kerak bo'lganda qo'shimcha kechikish.",
        realWorldArchitecture:
          "Serverless ilova hodisa manbalarini (API Gateway, navbatlar, ob'ekt-saqlash hodisalari, jadvallar) boshqariladigan xizmatlarni (DynamoDB, S3) o'qib/yozuvchi funksiyalarga ulaydi. Yamash yoki masshtablash uchun serverlar yo'q. U o'zgaruvchan, hodisaga asoslangan va yopishtirgich ishlar uchun mukammal; doimiy yuqori o'tkazuvchanlik yoki uzoq muddatli ishlar uchun iqtisodiy jihatdan kamroq mos.",
        packetFlow:
          "Hodisa (API Gateway orqali HTTP so'rovi, saqlashdagi yangi fayl, navbat xabari) platformani funksiya nusxasiga yo'naltirish uchun tetiklaydi — issiq nusxani qayta ishlatish yoki yangi nusxani sovuq ishga tushirish. Funksiya bajariladi, boshqariladigan xizmatlarni chaqiradi, natija qaytaradi va nusxa potensial qayta ishlatish uchun muzlatiladi.",
        securityImplications:
          "Yamash uchun serverlar yo'qligi bitta hujum yuzasini kamaytiradi, lekin boshqalarini kengaytiradi: har bir funksiya qat'iy belgilangan IAM roliga muhtoj (haddan tashqari imtiyozli rollar serverless ning eng yuqori xavfi), bog'liqliklar hali ham yamoqni talab qiladi va hodisa-ma'lumot in'yeksiyasi (masalan, ishonchsiz yuklash hodisasidan) tekshirilishi kerak. Funksiya-hodisa-ma'lumot ushbu modelga xos in'yeksiya vektori.",
        diagrams: [
          {
            type: "mermaid",
            title: "Hodisaga asoslangan serverless oqimi",
            content:
              "graph LR\n  API[API Gateway] --> F1[Funksiya: handleOrder]\n  S3[Ob'ekt Saqlash hodisasi] --> F2[Funksiya: processImage]\n  F1 --> DB[(Boshqariladigan MB)]\n  F2 --> Q[Navbat]",
          },
        ],
        summary:
          "Serverless provayderlar boshqaradigan masshtablash va foydalanish uchun to'lov hisobi bilan holatsiz, hodisaga tetiklangan funksiyalarni bajaradi. U server boshqaruvini olib tashlaydi, lekin har funksiya uchun minimal imtiyozli IAM va sovuq ishga tushirish hamda bajarish chegaralaridan xabardorlikni talab qiladi.",
      }
    ),
    buildLesson("software-architecture", "event-driven", "Hodisaga Asoslangan Arxitektura", "Advanced", "28m", "hodisaga asoslangan arxitektura"),
    buildLesson("software-architecture", "hybrid-architecture", "Gibrid Arxitektura", "Advanced", "25m", "gibrid arxitektura"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 6 — NETWORK SECURITY                                            */
/* ----------------------------------------------------------------------- */

const section6: CourseSection = {
  id: "network-security",
  title: "Tarmoq Xavfsizligi",
  description:
    "Hujumlar va mudofaa — MITM va DDoS dan IDS/IPS, SIEM va zamonaviy kiberoperatsiyalarning rangli jamoalarigacha.",
  icon: "ShieldAlert",
  color: "#ff0066",
  totalDuration: "8h 45m",
  lessons: [
    buildLesson(
      "network-security",
      "mitm",
      "O'rtadagi Odam Hujumlari",
      "Advanced",
      "30m",
      "o'rtadagi odam hujumlari",
      {
        introduction:
          "O'rtadagi Odam (MITM) hujumi tajovuzkorni ikki muloqot qiluvchi tomon o'rtasiga yashirincha joylashtiradi, ikkala tomon ham shaxsiy deb hisoblagan trafikni o'qiy va ko'pincha o'zgartira oladi. Bu ko'plab aniq texnikalar uchun qamrab oluvchi atama.",
        theory:
          "MITM ikki taxmindan birini buzish orqali ishlaydi: siz to'g'ri tomon bilan gaplashayapsiz (autentifikatsiya) yoki hech kim boshqasi kanalini o'qiy olmaydi (maxfiylik). Pozitsiyaga erishish texnikalariga ARP soxtalashtirish (LAN), DNS soxtalashtirish, qallob Wi-Fi kirish nuqtalari, BGP hijacking (Internet miqyosi) va DHCP soxtalashtirish kiradi. Bir marta pozitsiyalangach, tajovuzkor passiv eshitishi yoki faol ma'lumot kiritishi va o'zgartirishi mumkin. To'g'ri autentifikatsiya bilan kuchli uchdan-uchga kriptografiya (sertifikat tekshiruvi bilan TLS) pozitsiyaga erishilsa ham MITMni mag'lub etadi.",
        realWorldArchitecture:
          "Himoyalar qatlamlangan: switchlar L2 soxtalashtirish ni to'xtatish uchun Dinamik ARP Tekshiruvi va DHCP sniffingdan foydalanadi; DNSSEC DNS javoblarini autentifikatsiya qiladi; HSTS va sertifikat pinnig TLS-stripping va qallob-sertifikat hujumlarini to'xtatadi; 802.1X qurilmalarni birinchi navbatda tarmoqqa autentifikatsiya qiladi. Kuzatuv takroriy MAC larni va kutilmagan shlyuz o'zgarishlarini kuzatadi.",
        packetFlow:
          "ARP-spoofing MITM da: tajovuzkor qurbonga shuni aytuvchi soxta ARP javoblari yuboradi — tajovuzkorning MAC shlyuz IP si ga egalik qiladi va shlyuzga qurbonning IP si ga tajovuzkor egalik qilishini aytadi. Ikkalasi ham ARP keshlarini yangilaydi. Endi ular o'rtasidagi har bir paket ko'rinmas qolish uchun uni yo'naltiradigan tajovuzkor orqali oqadi.",
        securityImplications:
          "Muvaffaqiyatli MITM hisob ma'lumotlari, sessiya tokenlar va maxfiy ma'lumotlarni ochadi va kontent kiritishni (zararli dastur, soxta kirish sahifalari) yoqadi. Bu SSL stripping va sessiya o'g'irlash uchun yoqish qadami. Yagona mustahkam himoya uchdan-uchga autentifikatsiyalangan shifrlash — tajovuzkor o'rtada o'tirishi mumkin, lekin trafikni o'qiy yoki soxtalashtirib bo'lmaydi.",
        attackVectors: [
          {
            name: "ARP keshi zaharlanishi",
            description: "Soxta ARP javoblari LAN trafikni tajovuzkor orqali yo'naltiradi.",
            severity: "High",
          },
          {
            name: "Qallob kirish nuqtasi",
            description:
              "Taniqli SSID bilan soxta Wi-Fi AP mijozlarni trafikni tajovuzkor orqali yo'naltirish uchun jalb qiladi.",
            severity: "High",
          },
          {
            name: "SSL stripping",
            description: "Qurbonning HTTPS ulanishini aniq matnda o'qish uchun HTTP ga pasaytirish.",
            severity: "Critical",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "ARP jadvalini tekshirib mumkin bo'lgan MITMni aniqlash.",
            code: "arp -a   # bitta MACni ulashgan ikki IP = gumon qilinadigan ARP soxtalashtirish\nip neigh show",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "MITM ushlab qolish",
            content:
              "graph LR\n  V[Qurbon] -->|to'g'ridan deb o'ylaydi| A[Tajovuzkor]\n  A -->|yo'naltiradi| G[Shlyuz]\n  G --> A\n  A --> V",
          },
        ],
        summary:
          "MITM ikki tomon o'rtasida trafikni yashirincha o'tkazadi. U L2, DNS, Wi-Fi yoki BGP da autentifikatsiya yoki maxfiylikni buzish orqali erishiladi. Autentifikatsiyalangan uchdan-uchga shifrlash (to'g'ri tekshirilgan TLS) hal qiluvchi himoya.",
      }
    ),
    buildLesson(
      "network-security",
      "ddos",
      "DDoS Hujumlari",
      "Advanced",
      "30m",
      "DDoS hujumlari",
      {
        introduction:
          "Tarqatilgan Xizmatni Rad Etish hujumi ko'p manbadan trafik bilan maqsadni bosib, qonuniy foydalanuvchilar o'ta olmasligi uchun tarmoq o'tkazuvchanligi, ulanishlar yoki hisoblashni tugaturadi. U onlayn eng keng tarqalgan va buzuvchi hujumlar qatoriga kiradi.",
        theory:
          "DDoS hujumlari ular maqsadlaydigan qatlam bo'yicha tasniflanadi. Hajmli hujumlar (UDP/ICMP floodlar, DNS, NTP, memcached orqali aks/kuchaytirish) xom tarmoq o'tkazuvchanligini to'ldiradi. Protokol hujumlari (SYN flood, bo'lingan paketlar) ulanish jadvalini yoki firewall holatini tugaturadi. Ilova qatlami hujumlari (HTTP floodlar, slowloris) qonuniy so'rovlarni taqlid qilib past trafik hajmida veb-server resurslarini tugaturadi. Kuchaytirish kichik soxtalashtirish-manbali so'rovlarga katta javoblarni qaytaradigan xizmatlarni suiiste'mol qilib tajovuzkorning tarmoq o'tkazuvchanligini ko'paytiradi.",
        realWorldArchitecture:
          "Yumshatish qatlamlangan: tozalash/CDN provayderi (Cloudflare, AWS Shield, Akamai) har qanday yagona ma'lumotlar markazining quvvatidan ancha katta global tarqatilgan anycast tarmoq bo'ylab hajmli trafikni yutadi. Anycast hujumni ko'plab saytlar bo'ylab tarqatadi. Ilova qatlamida tezlikni cheklash, CAPTCHAlar, ulanish chegaralari va WAF suiiste'mol so'rovlarini filtrlaydi. Quvvat rejalashtirish va avtomatik masshtablash zahira ta'minlaydi.",
        packetFlow:
          "SYN flood da: tajovuzkor (ko'pincha soxtalashtirish-manba IP lar bilan) TCP SYN paketlar selini yuboradi. Server har biri uchun yarim-ochiq ulanish yozuvini ajratadi va SYN-ACK javob beradi, so'ng hech qachon kelmaydigan ACK ni kutadi. Nevbat to'ladi va qonuniy SYNlar tushiriladi. SYN cookie'lar handshake tugagunga qadar xotira ajratilmasligi uchun holatni SYN-ACK da kodlash orqali buni himoya qiladi.",
        securityImplications:
          "DDoS to'g'ridan-to'g'ri uzilish va daromad yo'qotishiga olib keladi va ba'zan boshqa joyda sodir bo'layotgan bosqinchilik uchun parda. Aks ettirish hujumlari shuningdek suiiste'mol qilingan uchinchi tomon serverlarini jalb qiladi. Himoya siz ega bo'lmagan quvvatni talab qiladi — shuning uchun mutaxassis tozalash provayderlariga tayanish.",
        attackVectors: [
          {
            name: "SYN flood",
            description: "Server ulanish nevbatini tugaturish uchun yarim-ochiq TCP ulanishlarni to'ldiradi.",
            severity: "High",
          },
          {
            name: "DNS kuchaytirish",
            description:
              "Kichik soxtalashtirish-manbali DNS so'rovlari qurbonga qaratilgan katta javoblarni ishga tushirib, tajovuzkor tarmoq o'tkazuvchanligini ko'paytiradi.",
            severity: "Critical",
          },
          {
            name: "HTTP flood / Slowloris",
            description:
              "Past hajmli, qonuniy ko'rinishdagi so'rovlar (yoki ataylab sekin) veb-server ishchi quvvatini tugaturadi.",
            severity: "High",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Aks ettirish / kuchaytirish DDoS",
            content:
              "graph TD\n  A[Tajovuzkor: soxtalashtirish src = qurbon] --> R1[Ochiq DNS Resolver]\n  A --> R2[Ochiq NTP Server]\n  R1 -->|katta javob| V[Qurbon]\n  R2 -->|katta javob| V",
          },
        ],
        summary:
          "DDoS ko'p manbadan maqsadning tarmoq o'tkazuvchanligi, holati yoki hisoblashini tugaturadi. U hajmli, protokol yoki ilova-qatlami. Himoya anycast tozalash provayderlar, SYN cookie'lar, tezlikni cheklash va WAF ni birlashtiradi — himoyachi ega bo'lmagan quvvatga tayanadi.",
      }
    ),
    buildLesson(
      "network-security",
      "ids-ips",
      "IDS va IPS",
      "Intermediate",
      "28m",
      "bosqinchilikni aniqlash va oldini olish tizimlari",
      {
        introduction:
          "Bosqinchilikni Aniqlash Tizimlari (IDS) va Bosqinchilikni Oldini Olish Tizimlari (IPS) hujum belgilari uchun tarmoq yoki host faoliyatini kuzatadi. IDS ogohlantiradi; IPS faol ravishda bloklaydi. Ular himoya arxitekturasining asosiy sensorlari.",
        theory:
          "Aniqlash ikki to'ldiruvchi yondashuvdan foydalanadi. Imzo asosidagi aniqlash trafikni ma'lum-yomon naqshlar ma'lumotlar bazasiga mos keltiradi — aniq, past soxta-ijobiy, lekin yangi hujumlarga ko'r. Anomaliya asosidagi aniqlash odatiy xatti-harakat bazasini qurib og'ishlarni bayroqli qiladi — noma'lum hujumlarni ushlashi mumkin, lekin shimliroq. NIDS/NIPS tarmoq trafikni (ko'pincha SPAN port yoki inline tap orqali) tekshiradi; HIDS/HIPS bitta hostning fayllar, jurnallar va jarayonlarini kuzatadi. IDS off-band o'tiradi va faqat ogohlantirishlar; IPS inline o'tiradi va zararli trafikni tushirishi, tiklashi yoki karantin qilishi mumkin — potensial tiqilinch va yagona nosozlik nuqtasi bo'lish narxida.",
        realWorldArchitecture:
          "Suricata, Snort va Zeek kabi ochiq manba mexanizmlari tarmoq bo'g'in nuqtalarida joylashtiriladi va korrelyatsiya uchun SIEM ga ogohlantirishlarni uzatadi. Bulut muhitlarida ekvivalent xizmatlar VPC trafikni tekshiradi. IPS qoidalari ehtiyotkorlik bilan moslashtiriladi: qonuniy trafikni bloklaydi haddan tashqari tajovuzkor qoida o'zining xizmatni rad etishi.",
        packetFlow:
          "NIDS tap yoki mirror portdan trafik nusxasini oladi, oqimlarni qayta yig'adi va ogohlantirishlar chiqarib har bir oqimni qoidalar to'plamiga nisbatan baholaydi. NIPS to'g'ridan-to'g'ri trafik yo'lida o'tiradi: yo'naltirish oldidan har bir paket tekshiriladi va mos keladigan zararli trafik tushiriladi yoki ulanish tiklanadi.",
        securityImplications:
          "IDS/IPS ko'rinuvchanlik va javob tezligini sezilarli darajada yaxshilaydi, lekin tajovuzkorlar ularni shifrlash (tekshirish TLS parolini ochishni talab qiladi), parchalanish va sekin 'past-va-sekin' texnikalar bilan chetlab o'tadi. Soxta ijobiylari ishonchni yo'q qiladi va haqiqiy trafikni bloklashga sabab bo'ladi. Ular mudofaaning chuqurlashtirish qatlami, hech qachon to'liq yechim emas.",
        diagrams: [
          {
            type: "mermaid",
            title: "IDS (off-band) vs IPS (inline)",
            content:
              "graph LR\n  NET[Tarmoq] --> SW[Switch]\n  SW -->|ko'zgu| IDS[IDS - faqat ogohlantirish]\n  NET --> IPS[IPS inline - bloklash] --> SRV[Serverlar]",
          },
        ],
        summary:
          "IDS aniqlab ogohlantiradi; IPS aniqlab inline bloklaydi. Aniqlash imzo asosidagi (aniq, ma'lum tahdidlar) yoki anomaliya asosidagi (yangilarini ushlaydi, shimliroq). Ular muhim ko'rinuvchanlik qo'shadi, lekin shifrlash va parchalanish bilan chetlab o'tiladi va soxta ijobiylarni cheklash uchun moslashtirilishi kerak.",
      }
    ),
    buildLesson("network-security", "packet-sniffing", "Packet Sniffing", "Intermediate", "22m", "packet sniffing"),
    buildLesson("network-security", "arp-spoofing", "ARP Spoofing", "Advanced", "25m", "ARP spoofing"),
    buildLesson("network-security", "dns-spoofing", "DNS Spoofing", "Advanced", "25m", "DNS spoofing"),
    buildLesson("network-security", "session-hijacking", "Session Hijacking", "Advanced", "25m", "session hijacking"),
    buildLesson("network-security", "ssl-stripping", "SSL Stripping Hujumi", "Advanced", "22m", "SSL stripping"),
    buildLesson("network-security", "syn-flood", "SYN Flood Hujumlari", "Intermediate", "20m", "SYN flood hujumlari"),
    buildLesson("network-security", "port-scanning", "Port Skanerlash", "Intermediate", "22m", "port skanerlash"),
    buildLesson("network-security", "enumeration", "Enumeration (Ro'yxatga Olish)", "Intermediate", "22m", "tarmoq enumeratsiyasi"),
    buildLesson("network-security", "siem", "SIEM Tizimlari", "Intermediate", "25m", "SIEM"),
    buildLesson("network-security", "waf", "Veb Ilova Firewalllar (WAF)", "Intermediate", "25m", "WAF-lar"),
    buildLesson("network-security", "zero-day", "Nol Kunlik Zaifliklar", "Advanced", "22m", "nol kunlik zaifliklar"),
    buildLesson("network-security", "threat-intelligence", "Tahdid Razvedkasi", "Intermediate", "22m", "tahdid razvedkasi"),
    buildLesson("network-security", "soc", "Xavfsizlik Operatsiyalari Markazi (SOC)", "Intermediate", "25m", "SOC"),
    buildLesson("network-security", "blue-team", "Ko'k Jamoa Operatsiyalari", "Intermediate", "22m", "ko'k jamoa operatsiyalari"),
    buildLesson("network-security", "red-team", "Qizil Jamoa Operatsiyalari", "Advanced", "25m", "qizil jamoa operatsiyalari"),
    buildLesson("network-security", "purple-team", "Binafsha Jamoa Operatsiyalari", "Advanced", "22m", "binafsha jamoa operatsiyalari"),
    buildLesson("network-security", "incident-response", "Hodisalarga Javob Berish", "Intermediate", "28m", "hodisalarga javob berish"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 7 — PENETRATION TESTING                                         */
/* ----------------------------------------------------------------------- */

const section7: CourseSection = {
  id: "pentesting",
  title: "Penetratsion Testlash",
  description:
    "Professional pentestchi toolkiti — Wireshark, Burp Suite, Nmap, Metasploit va boshqalar — qonuniy va samarali foydalaniladi.",
  icon: "Crosshair",
  color: "#8800ff",
  totalDuration: "5h 30m",
  lessons: [
    buildLesson(
      "pentesting",
      "wireshark",
      "Wireshark",
      "Intermediate",
      "32m",
      "Wireshark",
      {
        introduction:
          "Wireshark — dunyoda eng keng qo'llaniladigan tarmoq protokoli analizatori. U jonli trafikni ushlab oladi va har bir paketni individual protokol maydonlarigacha tahlil qiladi — nosozliklarni bartaraf etish, xavfsizlikni tahlil qilish va tarmoqlar haqiqatda qanday ishlashini o'rganish uchun zaruriy.",
        theory:
          "Wireshark tarmoq interfeysidan (libpcap/npcap orqali) freymlarni ushlab oladi, so'ng har bir qatlamni — Ethernet, IP, TCP, TLS, HTTP va boshqalarni — dekodlash uchun yuzlab protokol dissektorlarini qo'llaydi. Ikki filtr tizimi mavjud: ushlash filtrlari (BPF sintaksisi, nima yozilishini cheklash uchun ushlashdan oldin qo'llaniladi) va ko'rsatish filtrlari (nima ko'rsatilishiga e'tibor qaratish uchun keyin qo'llaniladi). 'Oqimni Kuzatish' kabi xususiyatlar butun suhbatni qayta tiklaydi va Statistika ko'rinishlari endpointlar, suhbatlar va protokol ierarxiyasini xulosalaydi.",
        realWorldArchitecture:
          "O'zingizga tegishli bo'lmagan trafikni ko'rish uchun switchda SPAN/mirror port, tarmoq TAP yoki hostda bo'lishingiz kerak. Zamonaviy kommutatsiyalangan tarmoqlarda standart bo'yicha faqat o'z trafikingizni va broadcastlarni ko'rasiz. Shifrlangan trafik uchun Wireshark sessiya kalitlari (SSLKEYLOGFILE muhit o'zgaruvchisi orqali) yoki forward-secret bo'lmagan shifrlar uchun serverning shaxsiy kaliti bilan ta'minlansa TLS ni parolini ochishi mumkin.",
        packetFlow:
          "Wireshark interfeysi promiskuitet (yoki Wi-Fi uchun monitor) rejimga qo'yadi, har bir ushlangan freymni vaqt tamg'asi qiladi, dissector zanjirini ishlatadi va paketlarni xotirada yoki pcap/pcapng faylida saqlaydi. Ko'rsatish filtrlari qayta ushlashsiz saqlangan to'plamni darhol qayta baholaydi.",
        securityImplications:
          "Wireshark himoya va tahlil vositasi, lekin ushlash fayllari juda maxfiy — ular aniq matnda hisob ma'lumotlari, tokenlar va shaxsiy ma'lumotlarni o'z ichiga olishi mumkin. Tekshirishga ruxsat etilmagan trafikni ushlash ko'p yurisdiksiyalarda noqonuniy. Wireshark o'zida dissector zaifliklari bo'lgan, shuning uchun minimal imtiyoz bilan ushlang (dumpcap), root sifatida emas.",
        cliExamples: [
          {
            language: "bash",
            description: "tshark bilan buyruq qatoridan ushlash va filtrlash.",
            code: "# eth0 da 100 paketni faylga yozish\ntshark -i eth0 -c 100 -w capture.pcapng\n\n# Saqlangan ushlashdan faqat HTTP so'rovlarni ko'rsatish\ntshark -r capture.pcapng -Y 'http.request' -T fields -e ip.src -e http.host -e http.request.uri",
          },
        ],
        configExamples: [
          {
            language: "text",
            description: "Foydali Wireshark ko'rsatish filtrlari.",
            code: "tcp.port == 443                # barcha HTTPS trafik\nhttp.response.code >= 400      # HTTP xatolari\ntcp.flags.syn == 1 && tcp.flags.ack == 0   # ulanish urinishlari\ndns.flags.response == 0        # DNS so'rovlari\nip.addr == 10.0.0.5 && tcp.analysis.retransmission",
          },
        ],
        wiresharkAnalysis:
          "Sahifa yuklanishini ushlang, ClientHello ni topish uchun `tls.handshake.type == 1` qo'llang, so'ng ServerHello uchun `tls.handshake.type == 2`. Qaysi endpointlar eng ko'p ma'lumot almashinganini ko'rish uchun Statistika > Suhbatlardan, to'liq HTTP almashinuvini o'qish uchun 'Kuzatish > TCP Oqimi' dan foydalaning.",
        diagrams: [
          {
            type: "mermaid",
            title: "Wireshark ushlash quvuri",
            content:
              "graph LR\n  NIC[Interfeys] --> CAP[libpcap ushlash]\n  CAP --> CF[Ushlash filtri]\n  CF --> DIS[Dissektorlar]\n  DIS --> DF[Ko'rsatish filtri]\n  DF --> UI[Paket ro'yxati / tafsilot]",
          },
        ],
        summary:
          "Wireshark tarmoq trafikni ushlab to'liq tahlil qiladi. Ushlash filtrlari nima yozilishini cheklaydi; ko'rsatish filtrlari ko'rinishga e'tibor qaratadi. Boshqalarning trafikni ko'rish mirror port yoki TAP talab qiladi; ushlash fayllari maxfiy va ruxsatsiz ushlash noqonuniy.",
      }
    ),
    buildLesson(
      "pentesting",
      "nmap",
      "Nmap",
      "Intermediate",
      "30m",
      "Nmap",
      {
        introduction:
          "Nmap (Network Mapper) — tarmoq kashfiyoti va xavfsizlik auditi uchun standart vosita. U har qanday baholashning birinchi savollariga javob beradi: qaysi hostlar tirik, qaysi portlar ochiq va qaysi xizmatlar va operatsion tizimlar ishlayapti.",
        theory:
          "Nmap bosqichlarda ishlaydi: host kashfiyoti (qaysi IP lar javob beradi — 'ping skanerlash'), port skanerlash (qaysi TCP/UDP portlar ochiq), xizmat/versiya aniqlash (dastur va versiyani aniqlash uchun ochiq portlarni zondlash) va ixtiyoriy OS barmoq izi olish. Skanerlash turlari yashirinlik va ishonchlilikda farq qiladi: TCP ulanish skanerlash (-sT) to'liq handshakeni yakunlaydi; SYN 'yarim-ochiq' skanerlash (-sS) SYN yuboradi va hech qachon yakunlamaydi, uni tezroq va ovozroq qiladi; UDP skanerlash (-sU) sekin va noaniq. Nmap Skriptlash Mexanizmi (NSE) zaiflik tekshiruvlari, sanab o'tish va boshqalar uchun Lua skriptlarini bajaradi.",
        realWorldArchitecture:
          "Penttestchilar Nmap ni maqsadga tarmoq erishuviga ega pozitsiyadan ishlatadi — Internetdan tashqi skanerlash yoki perimetr ichidan ichki skanerlash. Himoyachilar uni aktivlar inventarizatsiyasi va firewall qoidalarini tasdiqlash uchun ishlatadi. Firewalllar va IDS skanerlashlarni aniqlaydi va tezlikni cheklashi yoki bloklashi mumkin, shuning uchun vaqt shablonlari (-T0 sekin/yashirin dan -T5 tez/shovqinligacha) tezlikni aniqlanishga nisbatan almashtiradi.",
        packetFlow:
          "SYN skanerlash har bir maqsad portiga TCP SYN yuboradi. SYN-ACK javobi port ochiq ekanligini anglatadi (Nmap keyin yarim-ochiq ulanishni yopish uchun RST yuboradi); RST javobi yopiq; javob yo'q yoki ICMP erishib bo'lmaydi filtrlangan. Versiya aniqlash so'ng mos ochiq portlarga to'liq ulanishlarni ochadi va banner javoblarini imzolar ma'lumotlar bazasiga nisbatan solishtiradv.",
        securityImplications:
          "Nmap ikki tomonlama: himoyachilarning aktivlar boshqaruvi va tajovuzkorlarning razvedkasi uchun zaruriy. Ruxsatsiz skanerlash ko'p yurisdiksiyalarda noqonuniy va o'zi dushmanlik harakati sifatida ko'riladi. Tajovuzkor skanerlashlar (-A, -T5, to'liq NSE) nozik xizmatlarni ishdan chiqarishi mumkin. Har doim ruxsat etilgan doirada ishlang.",
        cliExamples: [
          {
            language: "bash",
            description: "Keng tarqalgan Nmap chaqiruvlari.",
            code: "# Eng yuqori 1000 portning tez SYN skanerlashi\nnmap -sS -T4 192.168.1.0/24\n\n# Xizmat/versiya + OS aniqlash + standart skriptlar\nnmap -sV -O -sC 10.0.0.10\n\n# Zaiflik skriptlari bilan to'liq TCP port diapazoni\nnmap -p- --script vuln 10.0.0.10",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Nmap SYN skanerlash mantiqi",
            content:
              "graph TD\n  S[SYN yubor] --> R{Javob?}\n  R -->|SYN-ACK| O[Port OCHIQ]\n  R -->|RST| C[Port YOPIQ]\n  R -->|yo'q / ICMP| F[Port FILTRLANGAN]",
          },
        ],
        summary:
          "Nmap hostlarni kashf qiladi, portlarni skanerlaydi va xizmatlar va operatsion tizimlarning barmoq izini oladi. SYN skanerlashlar tez va yashirin; NSE skriptlangan tekshiruvlar qo'shadi. U kuchli va ikki tomonlama — faqat sinovdan o'tkazishga ruxsat etilgan tizimlarni skanerlang.",
      }
    ),
    buildLesson(
      "pentesting",
      "burp-suite",
      "Burp Suite",
      "Advanced",
      "32m",
      "Burp Suite",
      {
        introduction:
          "Burp Suite — veb ilova xavfsizligini testlash uchun sanoat standarti platforma. U brauzeringiz va maqsad o'rtasida ushlab qoluvchi proksi sifatida ishlaydi, har bir so'rovni tekshirish, o'zgartirish va qayta yuborishga imkon beradi.",
        theory:
          "Burp o'rtadagi odam proksi sifatida o'tiradi: brauzer uning orqali trafikni yo'naltirish uchun sozlanadi va Burp HTTPS ni o'qiy olishi uchun o'z CA sertifikatini o'rnatadi. Asosiy vositalar: Proksi (trafikni ushlab olish va ko'rish), Repeater (so'rovni qo'lda yaratish va qayta yuborish), Intruder (avtomatlashtirilgan, parametrlangan hujumlar — fuzz qilish, kuch bilan sinash), Scanner (avtomatlashtirilgan zaiflik aniqlash, Pro versiyasida), Decoder va Comparer. Target yorlig'i kashf etilgan kontent sayta xaritasini qurib boradi.",
        realWorldArchitecture:
          "Tester brauzer proksiini Burp tinglovchisiga sozlaydi (standart 127.0.0.1:8080), Burp CA ga ishonadi, so'ng Burp sayta xaritasini to'ldirishi uchun maqsadni ko'rib chiqadi. U yerdan so'rovlar qo'lda zondlash uchun Repeater ga yoki avtomatlashtirishga Intruder ga yuboriladi. Burp doirasi qoidalari testlashni ruxsat etilgan hostlar bilan cheklab saqlaydi, shuning uchun tegishli bo'lmagan trafik hujumga uchramaydi yoki jurnalga yozilmaydi.",
        packetFlow:
          "Brauzer Burp ga so'rov yuboradi. Burp uni qo'lda tahrirlash uchun to'xtatib qo'yishi (ushlab olish yoqilgan) yoki jurnallashtirib o'tkazib yuborishi mumkin. So'ng so'rovni serverga yo'naltiradi, javobni oladi va brauzega qaytaradi. Burp ikkala tomonda o'z sertifikati bilan TLS ni yakunlaganligi sababli, barcha HTTPS kontentni aniq matnda ko'radi.",
        securityImplications:
          "Burp faqat ruxsat etilgan testlash uchun — ruxsatsiz tizimlarga nisbatan foydalanish noqonuniy. Maxsus CA faqat testchiining o'z mashinasida ishonilishi kerak; boshqa joyda ishonish haqiqiy MITM xavfini yaratadi. Intruder va Scanner muhim, potensial zararli trafik hosil qiladi, shuning uchun doira va tezlik chegaralari muhim.",
        cliExamples: [
          {
            language: "text",
            description: "Odatiy Burp ish jarayoni qadamlari.",
            code: "1. Brauzer proksisini -> 127.0.0.1:8080 ga sozlash\n2. http://burp ga kirish va CA sertifikatni o'rnatish\n3. Sayta xaritasini to'ldirish uchun maqsadni ko'rib chiqish\n4. So'rovni o'ng tugma bilan bosish -> Repeater / Intruder ga yuborish\n5. Faqat ruxsat etilgan hostlar testlanishi uchun doira belgilash",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Burp ushlab oluvchi proksi",
            content:
              "graph LR\n  B[Brauzer] --> P[Burp Proksi]\n  P -->|ushlab olish / o'zgartirish| S[Maqsad Server]\n  S --> P\n  P --> B",
          },
        ],
        summary:
          "Burp Suite — veb ilova testlash uchun ushlab oluvchi proksi — Proksi, Repeater, Intruder va Scanner so'rovlarni tekshirish, o'zgartirish, qayta yuborish va fuzz qilishga imkon beradi, o'z CA orqali HTTPS ni ham. Bu qat'iy ruxsat etilgan testlash vositasi bo'lib, haqiqiy MITM kuchiga ega.",
      }
    ),
    buildLesson("pentesting", "metasploit", "Metasploit Framework", "Advanced", "30m", "Metasploit"),
    buildLesson("pentesting", "bettercap", "Bettercap", "Advanced", "25m", "Bettercap"),
    buildLesson("pentesting", "ettercap", "Ettercap", "Advanced", "22m", "Ettercap"),
    buildLesson("pentesting", "owasp-zap", "OWASP ZAP", "Intermediate", "25m", "OWASP ZAP"),
    buildLesson("pentesting", "tcpdump", "tcpdump", "Intermediate", "22m", "tcpdump"),
    buildLesson("pentesting", "netcat", "Netcat", "Intermediate", "22m", "netcat"),
    buildLesson("pentesting", "mitmproxy", "mitmproxy", "Advanced", "25m", "mitmproxy"),
  ],
};

export const COURSE_SECTIONS: CourseSection[] = [
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
];

export function getSection(sectionId: string): CourseSection | undefined {
  return COURSE_SECTIONS.find((s) => s.id === sectionId);
}

export function getLesson(sectionId: string, lessonId: string): Lesson | undefined {
  return getSection(sectionId)?.lessons.find((l) => l.id === lessonId);
}

export function getAllLessons(): Lesson[] {
  return COURSE_SECTIONS.flatMap((s) => s.lessons);
}

export function getAdjacentLessons(
  sectionId: string,
  lessonId: string
): { prev?: Lesson; next?: Lesson } {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.sectionId === sectionId && l.id === lessonId);
  if (idx === -1) return {};
  return { prev: all[idx - 1], next: all[idx + 1] };
}

export const TOTAL_LESSONS = getAllLessons().length;

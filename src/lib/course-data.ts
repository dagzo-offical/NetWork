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
    introduction: `${title} — zamonaviy tarmoq va xavfsizlikning asosiy qurilish bloki. Ushbu darsda ${topic} nima ekanligini, nima uchun muhimligini va real ishlab chiqarish tarmoqlarida qanday ishlashini o'rganamiz.`,
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
          "Tarmoq — ma'lumot almashish uchun ulangan ikki yoki undan ortiq qurilma. Bu oddiy g'oya kabel orqali ulangan ikkita noutbukdan tortib, global Internetdagi milliardlab qurilmalargacha kengayadi. Ushbu dars har bir keyingi dars tayanadigan lug'atni — node, link, host, protokol, topologiya — o'rnatadi.",
        theory:
          "Tarmoq uchta narsa bilan belgilanadi: tugunlar (endpoint va oraliq qurilmalar), havolalar (signallarni tashuvchi muhit — mis, tolali optik, radio) va protokollar (ma'lumotlarni formatlash va almashinish uchun kelishilgan qoidalar). Muloqot qatlamli: har bir qatlam bitta muammoni hal qiladi va yuqori qatlamga toza abstraksiya beradi. OSI modeli yetti qatlamni belgilaydi (Fizik, Ma'lumotlar havolasi, Tarmoq, Transport, Sessiya, Taqdimot, Ilova); TCP/IP modeli bularni to'rttaga qisqartiradi (Havola, Internet, Transport, Ilova). Qatlamlash veb-brauzerga Wi-Fi yoki Ethernet ustida ishlayotganligini e'tiborsiz qoldirishga imkon beradi.",
        realWorldArchitecture:
          "Odatiy ofis tarmog'ida end qurilmalar (noutbuklar, telefonlar) access switchlarga, ular distribution/core switchga, u esa router/firewallga ulangan bo'lib, ISP ga yetib boradi. Simsiz kirish nuqtalari radio mijozlarni simli LAN ga ko'prik orqali ulaydi. Serverlar alohida VLAN da joylashgan. Bu kirish/tarqatish/yadro ierarxiyasi broadcast domenlarini kichik va nosozlik domenlarini izolyatsiyalangan saqlaydi.",
        packetFlow:
          "Noutbuk A bir xil LAN dagi server B ga xabar yuborayotganda: ilova ma'lumot ishlab chiqaradi, transport qatlami TCP/UDP sarlavhasi qo'shadi, tarmoq qatlami manba/manzil IP bilan IP sarlavhasi qo'shadi, ma'lumotlar havolasi qatlami manba/manzil MAC bilan Ethernet freymiga o'raydi va fizik qatlam bitlarni simga kodlaydi. Switch manzil MAC ni o'qib, freymni faqat to'g'ri portdan yuboradi. B jarayonni teskari — har bir sarlavha qatlamini ajratib — amalga oshiradi.",
        securityImplications:
          "Har bir umumiy muhit tinglab turish imkoniyatidir. Hub da (yoki buzilgan switchda) har qanday tugun boshqalarga tegishli trafikni ko'rishi mumkin. Broadcast trafigi segmentdagi har bir tugunga yetib boradi. Tarmoq portiga ulanadigan tajovuzkor o'sha broadcast domenidagi har bir qurilmaga Layer 2 kirishini oladi — shuning uchun fizik port xavfsizligi va tarmoq segmentatsiyasi asosiy boshqaruvlardir.",
        commonMistakes: [
          "OSI modelini (o'qitish abstraksiyasi) stek aslida qanday amalga oshirilishi (TCP/IP) bilan chalkashtirib yuborish.",
          "Switch xavfsizlik ta'minlaydi deb o'ylash — u samaradorlik ta'minlaydi, maxfiylik emas.",
          "Segmentatsiyasiz bitta katta tekis tarmoq loyihalash.",
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
          "Tarmoq = tugunlar + havolalar + protokollar, qatlamlarga tashkil etilgan. Qatlamlash muammolarni ajratadi; switchlar MAC bo'yicha, routerlar IP bo'yicha yo'naltiradi. Umumiy muhit tinglab turish xavfini anglatadi, shuning uchun segmentatsiya asosiy xavfsizlik nazoravidir.",
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
          "Internet — bitta tarmoq emas — bu trafik almashishga kelishgan ~75,000 ta mustaqil boshqariladigan tarmoqlar (Avtonom Tizimlar) tarmog'i. Ushbu dars noutbukingizdan boshqa qit'adagi serverga paket qanday yetib borishini tushuntiradi.",
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
          "Tarmoqlar geografik miqyos bo'yicha tasniflanadi. LAN, MAN va WAN faqat hajm jihatidan emas, balki egalik, texnologiya, kechikish va narx jihatidan ham farq qiladi — va bu farqlar arxitektura qarorlarini belgilaydi.",
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
      "HTTP Architecture",
      "Beginner",
      "25m",
      "the HTTP protocol",
      {
        introduction:
          "HTTP (HyperText Transfer Protocol) is the request/response protocol that powers the web. Every page load, API call and image fetch is HTTP. This lesson explains its stateless client-server design and message structure.",
        theory:
          "HTTP is a stateless, text-based (in HTTP/1.x) application-layer protocol. A client sends a request — method, target URI, version, headers, optional body — and the server returns a response — status line, headers, optional body. Statelessness means each request is independent; the server keeps no memory of prior requests unless the application adds state via cookies or tokens. HTTP runs over TCP (HTTP/1.1, HTTP/2) or QUIC/UDP (HTTP/3).",
        realWorldArchitecture:
          "In production, a browser rarely talks directly to an application server. The request hits a CDN edge, then a load balancer, then a reverse proxy (NGINX), then an application server, which may call microservices and databases. Each hop may add, remove or rewrite HTTP headers. Keep-alive connections and connection pooling reduce TCP setup cost.",
        packetFlow:
          "1) DNS resolves the host. 2) TCP three-way handshake (SYN, SYN-ACK, ACK). 3) For HTTPS, a TLS handshake. 4) The client sends the HTTP request line and headers, blank line, then body. 5) The server responds. 6) With keep-alive the TCP connection is reused for further requests. A packet capture shows the request as readable text (over HTTP) or as encrypted TLS records (over HTTPS).",
        securityImplications:
          "Plain HTTP is fully readable and modifiable by anyone on the path — credentials, cookies and content are exposed. Header injection, request smuggling (exploiting parsing differences between proxies) and verbose error pages are all real risks. Always serve over HTTPS and normalise headers at the edge.",
        attackVectors: [
          {
            name: "HTTP request smuggling",
            description:
              "Conflicting Content-Length / Transfer-Encoding interpretation between a front-end proxy and back-end server lets an attacker desync the connection.",
            severity: "Critical",
          },
          {
            name: "Plaintext interception",
            description: "On HTTP, any on-path attacker reads and rewrites traffic.",
            severity: "High",
          },
        ],
        configExamples: [
          {
            language: "http",
            description: "A raw HTTP/1.1 request and response.",
            code: "GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: curl/8.0\nAccept: */*\n\nHTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 138\n\n<!doctype html>...",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "HTTP request lifecycle",
            content:
              "sequenceDiagram\n  Client->>DNS: resolve host\n  Client->>Server: TCP SYN/ACK\n  Client->>Server: HTTP GET /\n  Server-->>Client: 200 OK + body",
          },
        ],
        summary:
          "HTTP is a stateless request/response protocol. Production traffic crosses CDNs, load balancers and proxies that rewrite headers. Plain HTTP is insecure; parsing inconsistencies enable request smuggling.",
      }
    ),
    buildLesson(
      "http-tls",
      "http-methods",
      "HTTP Methods",
      "Beginner",
      "20m",
      "HTTP methods",
      {
        introduction:
          "HTTP methods (verbs) declare the intent of a request. Choosing the right one — and respecting its semantics around safety and idempotency — is the foundation of correct, cacheable, secure APIs.",
        theory:
          "GET retrieves a resource and must be safe (no side effects). HEAD is GET without a body. POST submits data and is neither safe nor idempotent. PUT replaces a resource and is idempotent. PATCH partially updates. DELETE removes a resource (idempotent). OPTIONS reports capabilities and drives CORS preflight. A method is safe if it does not modify state; idempotent if repeating it has the same effect as doing it once.",
        realWorldArchitecture:
          "REST APIs map methods to CRUD operations. Caches and CDNs will only cache safe methods (GET/HEAD). Load balancers may route by method. Browsers automatically retry idempotent requests on connection failure but not POST — which is why payment endpoints use idempotency keys.",
        packetFlow:
          "The method is the first token on the request line. A CORS preflight is an automatic OPTIONS request the browser sends before a non-simple cross-origin request, carrying Access-Control-Request-Method.",
        securityImplications:
          "Allowing unsafe methods on read-only endpoints, or leaving TRACE/PUT enabled on a server, expands attack surface. Verb tampering can bypass naive authorisation checks that only protect GET/POST.",
        commonMistakes: [
          "Using GET for state-changing actions — they get cached, logged in URLs, and prefetched.",
          "Assuming PATCH is idempotent (it generally is not).",
          "Leaving TRACE enabled, enabling Cross-Site Tracing.",
        ],
        summary:
          "Methods declare intent. GET/HEAD are safe; GET/PUT/DELETE are idempotent; POST/PATCH are neither. Respecting these semantics keeps caching, retries and security correct.",
      }
    ),
    buildLesson(
      "http-tls",
      "tls-handshake",
      "The TLS 1.3 Handshake",
      "Advanced",
      "35m",
      "the TLS handshake",
      {
        introduction:
          "The TLS handshake is the negotiation that turns an insecure TCP connection into an encrypted, authenticated channel. TLS 1.3 streamlined it to a single round trip. This lesson dissects every message.",
        theory:
          "TLS provides confidentiality (encryption), integrity (AEAD ciphers) and authentication (certificates). The 1.3 handshake: the client sends ClientHello with supported cipher suites, a key share (an ephemeral Diffie-Hellman public key) and extensions. The server replies with ServerHello (chosen suite, its key share), then — now encrypted — Certificate, CertificateVerify (a signature proving it holds the private key) and Finished. Both sides derive identical session keys from the DH exchange via the HKDF key schedule. TLS 1.3 removed RSA key exchange, static DH, and weak ciphers, and made forward secrecy mandatory.",
        realWorldArchitecture:
          "TLS is usually terminated at the edge — on a CDN, load balancer or reverse proxy — which holds the certificate and private key. Traffic to the back-end may be re-encrypted (mTLS inside a service mesh) or sent in plaintext within a trusted segment. Session resumption (PSK tickets) and 0-RTT let returning clients skip a round trip.",
        packetFlow:
          "After the TCP handshake: ClientHello → ServerHello → {EncryptedExtensions, Certificate, CertificateVerify, Finished} → Finished. Application data can flow after the client's Finished — one round trip. With 0-RTT, the client sends data inside the very first flight.",
        securityImplications:
          "Forward secrecy (ephemeral DH) means a future private-key compromise cannot decrypt past traffic. 0-RTT data is replayable and must be idempotent only. Downgrade attacks try to force older TLS/cipher versions — TLS 1.3 includes downgrade sentinels. A weak or compromised CA undermines the whole trust chain.",
        attackVectors: [
          {
            name: "Protocol downgrade",
            description:
              "An on-path attacker strips TLS 1.3 support to force a vulnerable older version or cipher.",
            severity: "High",
          },
          {
            name: "0-RTT replay",
            description: "Early-data sent in 0-RTT can be captured and replayed by an attacker.",
            severity: "Medium",
          },
        ],
        configExamples: [
          {
            language: "bash",
            description: "Inspect a server's TLS handshake and certificate.",
            code: "openssl s_client -connect example.com:443 -tls1_3 -servername example.com\n# Look at: Cipher, Server certificate, Verify return code",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Enumerate supported TLS versions and ciphers.",
            code: "nmap --script ssl-enum-ciphers -p 443 example.com",
          },
        ],
        wiresharkAnalysis:
          "Filter on `tls.handshake`. You will see ClientHello and ServerHello in clear text; everything after the ServerHello key share is encrypted. Inspect the `Supported Versions` and `Key Share` extensions to confirm TLS 1.3.",
        diagrams: [
          {
            type: "mermaid",
            title: "TLS 1.3 one round-trip handshake",
            content:
              "sequenceDiagram\n  Client->>Server: ClientHello + key_share\n  Server->>Client: ServerHello + key_share\n  Server->>Client: {Certificate, CertVerify, Finished}\n  Client->>Server: {Finished}\n  Client->>Server: Application Data",
          },
        ],
        summary:
          "TLS 1.3 establishes an encrypted, authenticated channel in one round trip using ephemeral Diffie-Hellman for mandatory forward secrecy. Certificates authenticate the server; HKDF derives keys; 0-RTT trades a round trip for replay risk.",
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
      "the NGINX web server",
      {
        introduction:
          "NGINX is an event-driven web server, reverse proxy and load balancer that powers a large share of the world's busiest sites. Its asynchronous architecture is the key to its performance.",
        theory:
          "Unlike a thread-per-connection model, NGINX uses a small number of worker processes, each running an event loop that multiplexes thousands of connections via epoll/kqueue. This keeps memory flat and avoids context-switch overhead under high concurrency (the C10k problem). Configuration is declarative: an http block contains server blocks (virtual hosts), which contain location blocks matched by URI.",
        realWorldArchitecture:
          "NGINX is typically the front door: terminating TLS, serving static assets, and reverse-proxying dynamic requests to application servers (PHP-FPM, Node, Gunicorn) over an upstream block. It load-balances across upstreams, caches responses, rate-limits, and rewrites headers. NGINX Plus and the open-source build also act as API gateways.",
        packetFlow:
          "A client connects to port 443. NGINX accepts the socket in a worker, completes the TLS handshake, parses the HTTP request, matches a server and location block, and either serves a file or opens an upstream connection to a backend, streaming the response back — often while caching it.",
        securityImplications:
          "Misconfigured location matching can expose files (e.g. an alias path traversal). Missing `proxy_pass` header hygiene can leak internal hosts. NGINX should run as an unprivileged user, drop the version banner, enforce TLS settings, and apply `limit_req` to blunt floods.",
        configExamples: [
          {
            language: "nginx",
            description: "A hardened reverse-proxy server block.",
            code: "server {\n  listen 443 ssl;\n  server_name app.example.com;\n  ssl_certificate     /etc/ssl/app.crt;\n  ssl_certificate_key /etc/ssl/app.key;\n  ssl_protocols TLSv1.2 TLSv1.3;\n  add_header Strict-Transport-Security \"max-age=63072000\" always;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    limit_req zone=api burst=20 nodelay;\n  }\n}",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Test and reload configuration safely.",
            code: "nginx -t            # validate config\nnginx -s reload     # graceful reload\nsystemctl status nginx",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "NGINX as reverse proxy",
            content:
              "graph LR\n  C[Clients] --> N[NGINX :443]\n  N -->|static| F[(Filesystem)]\n  N -->|/api| A1[App :3000]\n  N -->|/api| A2[App :3001]",
          },
        ],
        summary:
          "NGINX uses an event-driven worker model to handle massive concurrency with flat memory. It excels as a TLS-terminating reverse proxy, static server and load balancer; hardening focuses on location matching, headers and rate limiting.",
      }
    ),
    buildLesson(
      "web-servers",
      "apache",
      "Apache HTTP Server",
      "Intermediate",
      "28m",
      "the Apache web server",
      {
        introduction:
          "Apache HTTP Server is the veteran of web servers — endlessly modular and configurable. Understanding its Multi-Processing Modules (MPMs) is the key to running it well.",
        theory:
          "Apache's behaviour is set by its MPM. `prefork` uses one process per connection (safe with non-thread-safe modules like classic mod_php, but memory-heavy). `worker` uses threads within processes. `event` (the modern default) frees worker threads during keep-alive idle time, approaching NGINX-like concurrency. Functionality is added through modules (mod_rewrite, mod_ssl, mod_security).",
        realWorldArchitecture:
          "Apache is common in shared hosting and LAMP stacks, and where `.htaccess` per-directory overrides are valued. It is frequently fronted by NGINX or a CDN for static caching, with Apache handling dynamic PHP via mod_php or PHP-FPM.",
        packetFlow:
          "A connection is accepted by the active MPM, dispatched to a process/thread, the request is parsed, the configured handlers and modules run in the request-processing phases, and a response is generated.",
        securityImplications:
          "`.htaccess` flexibility is also a risk — it lets directory-level config drift. Information disclosure via ServerTokens/ServerSignature, directory listing via mod_autoindex, and outdated modules are common findings. mod_security adds a WAF layer.",
        configExamples: [
          {
            language: "apache",
            description: "A hardened virtual host.",
            code: "<VirtualHost *:443>\n  ServerName app.example.com\n  SSLEngine on\n  SSLCertificateFile /etc/ssl/app.crt\n  SSLProtocol -all +TLSv1.2 +TLSv1.3\n  ServerTokens Prod\n  ServerSignature Off\n  <Directory /var/www/app>\n    Options -Indexes\n    AllowOverride None\n    Require all granted\n  </Directory>\n</VirtualHost>",
          },
        ],
        summary:
          "Apache is the modular, mature web server; its MPM choice (prefork/worker/event) defines concurrency and memory behaviour. Hardening targets .htaccess sprawl, information disclosure and module currency.",
      }
    ),
    buildLesson(
      "web-servers",
      "caddy",
      "Caddy",
      "Beginner",
      "22m",
      "the Caddy web server",
      {
        introduction:
          "Caddy is a modern web server whose headline feature is fully automatic HTTPS — it obtains and renews TLS certificates with zero configuration.",
        theory:
          "Caddy is written in Go, ships as a single static binary, and uses the ACME protocol to automatically provision certificates from Let's Encrypt or ZeroSSL. Its configuration (the Caddyfile) is intentionally minimal, and it exposes a JSON config API for dynamic reconfiguration without restarts.",
        realWorldArchitecture:
          "Caddy suits small-to-medium deployments, internal tools and edge nodes where operational simplicity matters. It serves static sites, reverse-proxies to applications, and handles certificate lifecycle automatically — eliminating an entire class of expired-certificate outages.",
        packetFlow:
          "On first request for a hostname, Caddy performs an ACME challenge (HTTP-01 or TLS-ALPN-01) to prove domain control, receives a certificate, caches it, and serves TLS. Renewals happen in the background well before expiry.",
        securityImplications:
          "Automatic HTTPS removes human error from certificate management. Caddy defaults to secure TLS settings. The main risks are exposing the admin API and over-broad on-demand TLS, which an attacker could abuse to trigger many ACME requests.",
        configExamples: [
          {
            language: "caddy",
            description: "A complete Caddyfile with automatic HTTPS.",
            code: "app.example.com {\n  reverse_proxy 127.0.0.1:3000\n  encode gzip zstd\n  header Strict-Transport-Security \"max-age=31536000\"\n}",
          },
        ],
        summary:
          "Caddy is a Go-based server defined by automatic, ACME-driven HTTPS and a minimal config. It trades fine-grained control for operational simplicity and secure-by-default behaviour.",
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
      "Linux Firewalling with iptables",
      "Advanced",
      "32m",
      "iptables",
      {
        introduction:
          "iptables is the classic interface to the Linux kernel's netfilter packet-filtering framework. Even where nftables or UFW are used, they ultimately drive the same kernel hooks — so understanding iptables is foundational.",
        theory:
          "netfilter exposes hooks as the packet traverses the kernel. iptables organises rules into tables (filter, nat, mangle, raw) and chains (INPUT, OUTPUT, FORWARD, PREROUTING, POSTROUTING). A packet is matched against the rules in the relevant chain in order; the first matching rule's target (ACCEPT, DROP, REJECT, or a jump) decides its fate. If no rule matches, the chain's default policy applies. Connection tracking (conntrack) makes the firewall stateful — it can ACCEPT packets belonging to ESTABLISHED connections without re-evaluating every rule.",
        realWorldArchitecture:
          "A server firewall sets default-DROP on INPUT, allows loopback, allows ESTABLISHED/RELATED, then explicitly permits required services (SSH, HTTPS). NAT rules in PREROUTING/POSTROUTING implement port forwarding and masquerading. In cloud environments, host iptables complements (does not replace) security groups and network ACLs.",
        packetFlow:
          "An inbound packet hits PREROUTING (raw, then conntrack, then mangle, then nat). A routing decision sends locally-destined packets to INPUT and transit packets to FORWARD. Locally-generated packets traverse OUTPUT then POSTROUTING. The filter table's INPUT/FORWARD/OUTPUT chains make the accept/drop decision.",
        securityImplications:
          "An overly permissive default policy, rule ordering mistakes (a broad ACCEPT before a specific DROP), or forgetting IPv6 (ip6tables is separate) all create holes. Stateful rules must be present or legitimate return traffic is blocked. Rules are not persistent across reboot unless saved.",
        configExamples: [
          {
            language: "bash",
            description: "A minimal stateful host firewall.",
            code: "iptables -P INPUT DROP\niptables -P FORWARD DROP\niptables -A INPUT -i lo -j ACCEPT\niptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\niptables -A INPUT -p tcp --dport 22 -j ACCEPT\niptables -A INPUT -p tcp --dport 443 -j ACCEPT",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Inspect and persist rules.",
            code: "iptables -L -n -v --line-numbers\niptables-save > /etc/iptables/rules.v4",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Packet path through netfilter",
            content:
              "graph LR\n  IN[Packet in] --> PRE[PREROUTING]\n  PRE --> RT{Routing}\n  RT -->|local| INP[INPUT]\n  RT -->|transit| FWD[FORWARD]\n  FWD --> POST[POSTROUTING]\n  INP --> APP[Local process]",
          },
        ],
        summary:
          "iptables drives netfilter's hooks via tables and chains. A correct host firewall is default-DROP, allows loopback and ESTABLISHED traffic, then whitelists services. Statefulness via conntrack and rule ordering are where mistakes happen.",
      }
    ),
    buildLesson(
      "server-infrastructure",
      "ssh",
      "SSH — Secure Shell",
      "Intermediate",
      "30m",
      "SSH",
      {
        introduction:
          "SSH is the encrypted protocol for remote administration, file transfer and tunnelling. It is the front door to nearly every server, which makes hardening it a security priority.",
        theory:
          "SSH provides an encrypted, authenticated channel over TCP/22. The handshake negotiates a key-exchange algorithm (typically ECDH/curve25519) to derive session keys, then authenticates the server via its host key and the client via a password or — preferably — public-key cryptography. The client proves possession of a private key whose public half is in the server's authorized_keys. Multiple logical channels (shell, port forwards, SFTP) are multiplexed over the one connection.",
        realWorldArchitecture:
          "Production access uses key-based auth (passwords disabled), often through a bastion/jump host that is the only SSH-exposed system. Keys may be short-lived certificates issued by an SSH CA. Agent forwarding, ProxyJump and config files streamline multi-hop access. Session recording and MFA add accountability.",
        packetFlow:
          "TCP handshake on 22 → SSH version exchange → algorithm negotiation → ECDH key exchange and host-key verification → user authentication → channel requests (pty, exec, direct-tcpip for port forwarding). All payload after key exchange is encrypted and integrity-protected.",
        securityImplications:
          "SSH on the public Internet is constantly brute-forced. Password auth, weak keys, root login, and stale authorized_keys are the main risks. Compromised agent forwarding can let a compromised host hijack your keys. Host-key changes may indicate a man-in-the-middle.",
        configExamples: [
          {
            language: "bash",
            description: "Hardened sshd_config directives.",
            code: "PermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nKexAlgorithms curve25519-sha256\nAllowUsers deploy admin\nMaxAuthTries 3",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Generate a key and jump through a bastion.",
            code: "ssh-keygen -t ed25519 -C 'deploy@laptop'\nssh -J bastion.example.com deploy@10.0.1.20",
          },
        ],
        summary:
          "SSH gives an encrypted, mutually-authenticated admin channel. Use key (or certificate) auth, disable passwords and root login, front access with a bastion, and watch host-key changes for MITM.",
      }
    ),
    buildLesson(
      "server-infrastructure",
      "load-balancing",
      "Load Balancing",
      "Intermediate",
      "28m",
      "load balancing",
      {
        introduction:
          "Load balancing distributes traffic across multiple servers to achieve scalability, high availability and zero-downtime deployments. It is a cornerstone of every resilient architecture.",
        theory:
          "A load balancer operates at Layer 4 (transport — routing by IP/port, fast and protocol-agnostic) or Layer 7 (application — routing by HTTP host, path, headers, enabling smart features). Algorithms include round-robin, least-connections, weighted, IP-hash (for stickiness) and EWMA latency-based. Health checks remove unhealthy backends. Session affinity ('sticky sessions') keeps a user pinned to one backend when state is local.",
        realWorldArchitecture:
          "Cloud load balancers (AWS ALB/NLB, GCP LB) sit in front of auto-scaling groups across multiple availability zones. A global load balancer uses DNS or anycast to route users to the nearest region. Internally, service meshes load-balance east-west traffic between microservices. Blue-green and canary deployments are implemented by shifting load-balancer weights.",
        packetFlow:
          "L4: the LB forwards or NATs the packet to a chosen backend; the backend may reply directly to the client (DSR) or via the LB. L7: the LB terminates the client TCP/TLS connection, parses HTTP, selects a backend by rules, and opens its own connection to it — letting it pool connections, retry, and rewrite.",
        securityImplications:
          "The load balancer is a TLS-termination point and a high-value target. It is also a natural place to enforce WAF rules, rate limiting and DDoS absorption. Misconfigured health checks can cause cascading failures; sticky sessions can create hotspots and uneven load.",
        diagrams: [
          {
            type: "mermaid",
            title: "L7 load balancing across AZs",
            content:
              "graph TD\n  C[Clients] --> LB[L7 Load Balancer]\n  LB --> A[Backend AZ-a]\n  LB --> B[Backend AZ-b]\n  LB --> D[Backend AZ-c]",
          },
        ],
        summary:
          "Load balancing spreads traffic for scale and availability. L4 is fast and generic; L7 is HTTP-aware and feature-rich. Health checks, algorithms and affinity must be tuned; the LB is also the ideal TLS/WAF enforcement point.",
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
      "Microservices Architecture",
      "Advanced",
      "32m",
      "microservices",
      {
        introduction:
          "Microservices structure an application as a suite of small, independently deployable services, each owning one business capability. The style trades operational complexity for organisational and scaling agility.",
        theory:
          "Each microservice has its own codebase, data store and deployment lifecycle, and communicates with others over the network — synchronously via HTTP/gRPC or asynchronously via messaging. Services are organised around business domains (bounded contexts). The decoupling lets teams deploy independently and scale hot services in isolation, but it turns in-process function calls into network calls subject to latency, partial failure and the CAP theorem.",
        realWorldArchitecture:
          "A microservices platform typically includes an API gateway (edge routing, auth), service discovery, a service mesh (mTLS, retries, observability), per-service databases, a message broker (Kafka, RabbitMQ), centralised logging/tracing, and a container orchestrator (Kubernetes). Resilience patterns — timeouts, retries with backoff, circuit breakers, bulkheads — are mandatory, not optional.",
        packetFlow:
          "A client request enters the API gateway, which authenticates it and routes to service A. Service A may call services B and C; each call is a fresh TLS connection (or a mesh-managed one). A distributed trace ID is propagated through every hop so the whole transaction can be reconstructed.",
        securityImplications:
          "The network is now the attack surface: every inter-service call must be authenticated and encrypted (mTLS) — 'zero trust' inside the cluster. A larger number of services means more endpoints, more secrets and more dependencies to patch. The blast radius of one compromised service is limited only by segmentation and least-privilege.",
        attackVectors: [
          {
            name: "Lateral movement between services",
            description:
              "A compromised service with broad network reach and over-scoped credentials pivots to others.",
            severity: "High",
          },
          {
            name: "Cascading failure",
            description:
              "One slow service exhausts caller threads, propagating failure across the system without circuit breakers.",
            severity: "Medium",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Microservices request flow",
            content:
              "graph TD\n  C[Client] --> GW[API Gateway]\n  GW --> A[Orders Service]\n  A --> B[Inventory Service]\n  A --> D[Payment Service]\n  B --> DB1[(Inventory DB)]\n  D --> DB2[(Payment DB)]",
          },
        ],
        summary:
          "Microservices = independently deployable, domain-aligned services communicating over the network. They enable team and scaling autonomy at the cost of distributed-systems complexity, demanding mTLS, resilience patterns and strong observability.",
      }
    ),
    buildLesson(
      "software-architecture",
      "monolith",
      "Monolithic Architecture",
      "Beginner",
      "22m",
      "monolithic architecture",
      {
        introduction:
          "A monolith is an application built and deployed as a single unit. Long unfashionable, it remains the correct default for most projects — and a well-structured monolith beats a badly-structured microservices estate every time.",
        theory:
          "In a monolith, all modules (UI, business logic, data access) run in one process and one deployment artifact. Calls between modules are fast, in-process function calls — no network, no serialisation, no partial failure. A single database means easy transactions and joins. The trade-off: the whole app scales as a unit, one bug can crash everything, and a large codebase can become tightly coupled ('the big ball of mud') without discipline.",
        realWorldArchitecture:
          "A monolith deploys behind a load balancer as several identical instances for horizontal scaling and availability, all sharing one database (often with read replicas). A 'modular monolith' enforces internal module boundaries, keeping the option open to extract a service later if a genuine need arises.",
        packetFlow:
          "A client request hits the load balancer, lands on one instance, and is handled entirely within that process — routing, business logic and database access — before a single response is returned. There are no internal network hops.",
        securityImplications:
          "The attack surface is smaller and simpler — one process, one set of dependencies, one deployment to patch. But there is no internal segmentation: a remote-code-execution flaw compromises the entire application and its database credentials at once.",
        diagrams: [
          {
            type: "mermaid",
            title: "Scaled monolith",
            content:
              "graph TD\n  C[Clients] --> LB[Load Balancer]\n  LB --> M1[Monolith Instance 1]\n  LB --> M2[Monolith Instance 2]\n  M1 --> DB[(Shared Database)]\n  M2 --> DB",
          },
        ],
        summary:
          "A monolith is one deployable unit: simple, fast internally, easy to reason about, with a small attack surface. Its limits are unit-scaling and coupling — both manageable with a disciplined modular structure.",
      }
    ),
    buildLesson(
      "software-architecture",
      "serverless",
      "Serverless Architecture",
      "Intermediate",
      "28m",
      "serverless architecture",
      {
        introduction:
          "Serverless lets you run code without managing servers. You deploy functions; the cloud provider handles provisioning, scaling and patching, billing you only for actual execution time.",
        theory:
          "Function-as-a-Service (FaaS — AWS Lambda, Azure Functions, Cloud Functions) runs short-lived, stateless, event-triggered functions. The provider scales them from zero to thousands of concurrent instances automatically. 'Serverless' more broadly also covers managed databases, queues and storage. Key constraints: functions are stateless (state lives in external stores), have execution time limits, and suffer 'cold starts' — added latency when a new instance must be initialised.",
        realWorldArchitecture:
          "A serverless app wires event sources (API Gateway, queues, object-storage events, schedules) to functions, which read/write managed services (DynamoDB, S3). There are no servers to patch or scale. It excels for spiky, event-driven and glue workloads; it fits steady high-throughput or long-running jobs less well economically.",
        packetFlow:
          "An event (HTTP request via API Gateway, a new file in storage, a queue message) triggers the platform to route it to a function instance — reusing a warm one or cold-starting a new one. The function executes, calls managed services, returns a result, and the instance is frozen for potential reuse.",
        securityImplications:
          "No servers to patch shrinks one attack surface but enlarges others: every function needs a tightly-scoped IAM role (over-privileged roles are the top serverless risk), dependencies still need patching, and event-data injection (e.g. from an untrusted upload event) must be validated. Function-event-data is an injection vector unique to this model.",
        diagrams: [
          {
            type: "mermaid",
            title: "Event-driven serverless flow",
            content:
              "graph LR\n  API[API Gateway] --> F1[Function: handleOrder]\n  S3[Object Storage event] --> F2[Function: processImage]\n  F1 --> DB[(Managed DB)]\n  F2 --> Q[Queue]",
          },
        ],
        summary:
          "Serverless runs stateless, event-triggered functions with provider-managed scaling and pay-per-use billing. It removes server management but demands least-privilege IAM per function and awareness of cold starts and execution limits.",
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
      "Man-in-the-Middle Attacks",
      "Advanced",
      "30m",
      "man-in-the-middle attacks",
      {
        introduction:
          "A Man-in-the-Middle (MITM) attack places an attacker secretly between two communicating parties, able to read and often modify traffic that both sides believe is private. It is the umbrella over many specific techniques.",
        theory:
          "A MITM works by violating one of two assumptions: that you are talking to the right party (authentication) or that nobody else can read the channel (confidentiality). Techniques to achieve the position include ARP spoofing (LAN), DNS spoofing, rogue Wi-Fi access points, BGP hijacking (Internet scale) and DHCP spoofing. Once positioned, the attacker can passively eavesdrop or actively inject and alter data. Strong end-to-end cryptography with proper authentication (TLS with certificate validation) defeats a MITM even if the position is achieved.",
        realWorldArchitecture:
          "Defences are layered: switches use Dynamic ARP Inspection and DHCP snooping to stop L2 spoofing; DNSSEC authenticates DNS responses; HSTS and certificate pinning stop TLS-stripping and rogue-certificate attacks; 802.1X authenticates devices onto the network in the first place. Monitoring watches for duplicate MACs and unexpected gateway changes.",
        packetFlow:
          "In an ARP-spoofing MITM: the attacker sends forged ARP replies telling the victim that the attacker's MAC owns the gateway IP, and telling the gateway that the attacker owns the victim's IP. Both update their ARP caches. Now every packet between them flows through the attacker, who forwards it on to stay invisible.",
        securityImplications:
          "A successful MITM exposes credentials, session tokens and confidential data, and enables content injection (malware, fake login pages). It is the enabling step for SSL stripping and session hijacking. The only robust defence is authenticated encryption end-to-end — the attacker can sit in the middle but cannot read or forge the traffic.",
        attackVectors: [
          {
            name: "ARP cache poisoning",
            description: "Forged ARP replies redirect LAN traffic through the attacker.",
            severity: "High",
          },
          {
            name: "Rogue access point",
            description:
              "A fake Wi-Fi AP with a familiar SSID lures clients into routing traffic through the attacker.",
            severity: "High",
          },
          {
            name: "SSL stripping",
            description: "Downgrading a victim's HTTPS connection to HTTP to read it in clear text.",
            severity: "Critical",
          },
        ],
        cliExamples: [
          {
            language: "bash",
            description: "Detecting a possible MITM by inspecting the ARP table.",
            code: "arp -a   # two IPs sharing one MAC = suspected ARP spoofing\nip neigh show",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "MITM interception",
            content:
              "graph LR\n  V[Victim] -->|thinks direct| A[Attacker]\n  A -->|forwards| G[Gateway]\n  G --> A\n  A --> V",
          },
        ],
        summary:
          "A MITM secretly relays traffic between two parties. It is achieved by breaking authentication or confidentiality at L2, DNS, Wi-Fi or BGP. Authenticated end-to-end encryption (correctly-validated TLS) is the decisive defence.",
      }
    ),
    buildLesson(
      "network-security",
      "ddos",
      "DDoS Attacks",
      "Advanced",
      "30m",
      "DDoS attacks",
      {
        introduction:
          "A Distributed Denial-of-Service attack overwhelms a target with traffic from many sources, exhausting bandwidth, connections or compute so legitimate users cannot get through. It is among the most common and disruptive attacks online.",
        theory:
          "DDoS attacks are categorised by the layer they target. Volumetric attacks (UDP/ICMP floods, reflection/amplification via DNS, NTP, memcached) saturate raw bandwidth. Protocol attacks (SYN flood, fragmented packets) exhaust connection-table or firewall state. Application-layer attacks (HTTP floods, slowloris) exhaust web-server resources with low traffic volume by mimicking legitimate requests. Amplification multiplies the attacker's bandwidth by abusing services that return large responses to small spoofed-source queries.",
        realWorldArchitecture:
          "Mitigation is layered: a scrubbing/CDN provider (Cloudflare, AWS Shield, Akamai) absorbs volumetric traffic across a globally distributed anycast network, far larger than any single data centre's capacity. Anycast spreads the attack across many sites. At the application layer, rate limiting, CAPTCHAs, connection limits and a WAF filter abusive requests. Capacity planning and autoscaling provide headroom.",
        packetFlow:
          "In a SYN flood: the attacker (often with spoofed source IPs) sends a torrent of TCP SYN packets. The server allocates a half-open connection entry and replies SYN-ACK for each, then waits for an ACK that never comes. The backlog queue fills, and legitimate SYNs are dropped. SYN cookies defend this by encoding state in the SYN-ACK so no memory is allocated until the handshake completes.",
        securityImplications:
          "DDoS causes outage and revenue loss directly, and is sometimes a smokescreen for an intrusion happening elsewhere. Reflection attacks also implicate the abused third-party servers. Defence requires capacity you do not own — hence reliance on specialist scrubbing providers.",
        attackVectors: [
          {
            name: "SYN flood",
            description: "Floods half-open TCP connections to exhaust the server's connection backlog.",
            severity: "High",
          },
          {
            name: "DNS amplification",
            description:
              "Small spoofed-source DNS queries trigger large responses aimed at the victim, multiplying attacker bandwidth.",
            severity: "Critical",
          },
          {
            name: "HTTP flood / Slowloris",
            description:
              "Low-volume, legitimate-looking requests (or deliberately slow ones) exhaust web-server worker capacity.",
            severity: "High",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Reflection / amplification DDoS",
            content:
              "graph TD\n  A[Attacker: spoofed src = victim] --> R1[Open DNS Resolver]\n  A --> R2[Open NTP Server]\n  R1 -->|large reply| V[Victim]\n  R2 -->|large reply| V",
          },
        ],
        summary:
          "DDoS exhausts a target's bandwidth, state or compute from many sources. It is volumetric, protocol or application-layer. Defence combines anycast scrubbing providers, SYN cookies, rate limiting and a WAF — leaning on capacity the defender does not own.",
      }
    ),
    buildLesson(
      "network-security",
      "ids-ips",
      "IDS & IPS",
      "Intermediate",
      "28m",
      "intrusion detection and prevention systems",
      {
        introduction:
          "Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) watch network or host activity for signs of attack. An IDS alerts; an IPS actively blocks. They are core sensors of a defensive architecture.",
        theory:
          "Detection uses two complementary approaches. Signature-based detection matches traffic against a database of known-bad patterns — precise, low false-positive, but blind to novel attacks. Anomaly-based detection builds a baseline of normal behaviour and flags deviations — can catch unknown attacks but is noisier. A NIDS/NIPS inspects network traffic (often via a SPAN port or inline tap); a HIDS/HIPS watches a single host's files, logs and processes. An IDS sits out-of-band and only alerts; an IPS sits inline and can drop, reset or quarantine malicious traffic — at the cost of being a potential bottleneck and single point of failure.",
        realWorldArchitecture:
          "Open-source engines like Suricata, Snort and Zeek are deployed at network choke points and feed alerts into a SIEM for correlation. In cloud environments, equivalent services inspect VPC traffic. IPS rules are tuned carefully: an over-aggressive rule that blocks legitimate traffic is its own denial of service.",
        packetFlow:
          "A NIDS receives a copy of traffic from a tap or mirror port, reassembles streams, and evaluates each flow against its rule set, emitting alerts. A NIPS sits directly in the traffic path: each packet is inspected before forwarding, and matching malicious traffic is dropped or the connection reset.",
        securityImplications:
          "IDS/IPS dramatically improve visibility and response speed, but attackers evade them with encryption (inspection needs TLS decryption), fragmentation, and slow 'low-and-slow' techniques. False positives erode trust and cause real traffic to be blocked. They are a layer of defence-in-depth, never a complete solution.",
        diagrams: [
          {
            type: "mermaid",
            title: "IDS (out-of-band) vs IPS (inline)",
            content:
              "graph LR\n  NET[Network] --> SW[Switch]\n  SW -->|mirror| IDS[IDS - alert only]\n  NET --> IPS[IPS inline - block] --> SRV[Servers]",
          },
        ],
        summary:
          "IDS detects and alerts; IPS detects and blocks inline. Detection is signature-based (precise, known threats) or anomaly-based (catches novel ones, noisier). They add essential visibility but are evaded by encryption and fragmentation and must be tuned to limit false positives.",
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
          "Wireshark is the world's most widely used network protocol analyser. It captures live traffic and dissects every packet down to individual protocol fields — indispensable for troubleshooting, security analysis and learning how networks really work.",
        theory:
          "Wireshark captures frames from a network interface (via libpcap/npcap), then applies hundreds of protocol dissectors to decode each layer — Ethernet, IP, TCP, TLS, HTTP and more. Two filter systems exist: capture filters (BPF syntax, applied before capture, to limit what is recorded) and display filters (applied after, to focus on what is shown). Features like 'Follow Stream' reassemble a whole conversation, and Statistics views summarise endpoints, conversations and protocol hierarchy.",
        realWorldArchitecture:
          "To see traffic that is not yours, you need a SPAN/mirror port on a switch, a network TAP, or to be on the host itself. On modern switched networks you only see your own traffic plus broadcasts by default. For encrypted traffic, Wireshark can decrypt TLS if supplied with the session keys (via the SSLKEYLOGFILE environment variable) or the server's private key for non-forward-secret ciphers.",
        packetFlow:
          "Wireshark places the interface in promiscuous (or monitor, for Wi-Fi) mode, timestamps each captured frame, runs the dissector chain, and stores packets in memory or a pcap/pcapng file. Display filters re-evaluate the stored set instantly without re-capturing.",
        securityImplications:
          "Wireshark is a defensive and analytical tool, but capture files are highly sensitive — they can contain credentials, tokens and personal data in clear text. Capturing traffic you are not authorised to inspect is illegal in most jurisdictions. Wireshark itself has had dissector vulnerabilities, so capture with least privilege (dumpcap), not as root.",
        cliExamples: [
          {
            language: "bash",
            description: "Capture and filter from the command line with tshark.",
            code: "# Capture 100 packets on eth0 to a file\ntshark -i eth0 -c 100 -w capture.pcapng\n\n# Display only HTTP requests from a saved capture\ntshark -r capture.pcapng -Y 'http.request' -T fields -e ip.src -e http.host -e http.request.uri",
          },
        ],
        configExamples: [
          {
            language: "text",
            description: "Useful Wireshark display filters.",
            code: "tcp.port == 443                # all HTTPS traffic\nhttp.response.code >= 400      # HTTP errors\ntcp.flags.syn == 1 && tcp.flags.ack == 0   # connection attempts\ndns.flags.response == 0        # DNS queries\nip.addr == 10.0.0.5 && tcp.analysis.retransmission",
          },
        ],
        wiresharkAnalysis:
          "Capture a page load, apply `tls.handshake.type == 1` to find the ClientHello, then `tls.handshake.type == 2` for the ServerHello. Use Statistics > Conversations to see which endpoints exchanged the most data, and 'Follow > TCP Stream' to read a full HTTP exchange.",
        diagrams: [
          {
            type: "mermaid",
            title: "Wireshark capture pipeline",
            content:
              "graph LR\n  NIC[Interface] --> CAP[libpcap capture]\n  CAP --> CF[Capture filter]\n  CF --> DIS[Dissectors]\n  DIS --> DF[Display filter]\n  DF --> UI[Packet list / detail]",
          },
        ],
        summary:
          "Wireshark captures and fully dissects network traffic. Capture filters limit what is recorded; display filters focus the view. Seeing others' traffic needs a mirror port or TAP; capture files are sensitive and capturing without authorisation is illegal.",
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
          "Nmap (Network Mapper) is the standard tool for network discovery and security auditing. It answers the first questions of any assessment: what hosts are alive, what ports are open, and what services and operating systems are running.",
        theory:
          "Nmap works in phases: host discovery (which IPs respond — the 'ping scan'), port scanning (which TCP/UDP ports are open), service/version detection (probing open ports to identify the software and version), and optional OS fingerprinting. Scan types differ in stealth and reliability: a TCP connect scan (-sT) completes the full handshake; a SYN 'half-open' scan (-sS) sends SYN and never completes, making it faster and quieter; UDP scans (-sU) are slow and ambiguous. The Nmap Scripting Engine (NSE) runs Lua scripts for vulnerability checks, enumeration and more.",
        realWorldArchitecture:
          "Pentesters run Nmap from a position with network reach to the target — an external scan from the Internet, or an internal scan from inside the perimeter. Defenders use it for asset inventory and to verify firewall rules. Firewalls and IDS detect and may rate-limit or block scans, so timing templates (-T0 slow/stealthy to -T5 fast/loud) trade speed against detectability.",
        packetFlow:
          "A SYN scan sends a TCP SYN to each target port. A SYN-ACK reply means the port is open (Nmap then sends RST to tear down the half-open connection); a RST reply means closed; no reply or an ICMP unreachable means filtered. Version detection then opens full connections to matching open ports and compares banner responses against a signature database.",
        securityImplications:
          "Nmap is dual-use: essential for defenders' asset management and for attackers' reconnaissance. Unauthorised scanning is illegal in many jurisdictions and is itself treated as a hostile act. Aggressive scans (-A, -T5, full NSE) can crash fragile services. Always operate within an authorised scope.",
        cliExamples: [
          {
            language: "bash",
            description: "Common Nmap invocations.",
            code: "# Fast SYN scan of the top 1000 ports\nnmap -sS -T4 192.168.1.0/24\n\n# Service/version + OS detection + default scripts\nnmap -sV -O -sC 10.0.0.10\n\n# Full TCP port range with vuln scripts\nnmap -p- --script vuln 10.0.0.10",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Nmap SYN scan logic",
            content:
              "graph TD\n  S[Send SYN] --> R{Response?}\n  R -->|SYN-ACK| O[Port OPEN]\n  R -->|RST| C[Port CLOSED]\n  R -->|none / ICMP| F[Port FILTERED]",
          },
        ],
        summary:
          "Nmap discovers hosts, scans ports, and fingerprints services and operating systems. SYN scans are fast and stealthy; NSE adds scripted checks. It is powerful and dual-use — only ever scan systems you are authorised to test.",
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
          "Burp Suite is the industry-standard platform for web application security testing. It acts as an intercepting proxy between your browser and the target, letting you inspect, modify and replay every request.",
        theory:
          "Burp sits as a man-in-the-middle proxy: the browser is configured to route traffic through it, and Burp installs its own CA certificate so it can read HTTPS. Core tools include Proxy (intercept and view traffic), Repeater (manually craft and resend a request), Intruder (automated, parameterised attacks — fuzzing, brute force), Scanner (automated vulnerability detection, in the Pro edition), Decoder and Comparer. The Target tab builds a site map of discovered content.",
        realWorldArchitecture:
          "A tester configures the browser proxy to Burp's listener (default 127.0.0.1:8080), trusts Burp's CA, then browses the target so Burp populates its site map. From there, requests are sent to Repeater for manual probing or Intruder for automation. Burp scope rules keep testing confined to authorised hosts so unrelated traffic is not attacked or logged.",
        packetFlow:
          "The browser sends a request to Burp. Burp can pause it (intercept on) for manual editing, or pass it through while logging. It then forwards the request to the server, receives the response, and returns it to the browser. Because Burp terminates TLS on both sides with its own certificate, it sees all HTTPS content in clear text.",
        securityImplications:
          "Burp is for authorised testing only — using it against systems without permission is illegal. The custom CA must only be trusted on the tester's own machine; trusting it elsewhere creates a real MITM risk. Intruder and Scanner generate significant, potentially damaging traffic, so scope and rate limits matter.",
        cliExamples: [
          {
            language: "text",
            description: "Typical Burp workflow steps.",
            code: "1. Set browser proxy -> 127.0.0.1:8080\n2. Visit http://burp and install the CA certificate\n3. Browse the target to populate the site map\n4. Right-click a request -> Send to Repeater / Intruder\n5. Define scope so only authorised hosts are tested",
          },
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "Burp intercepting proxy",
            content:
              "graph LR\n  B[Browser] --> P[Burp Proxy]\n  P -->|intercept / modify| S[Target Server]\n  S --> P\n  P --> B",
          },
        ],
        summary:
          "Burp Suite is an intercepting proxy for web app testing — Proxy, Repeater, Intruder and Scanner let you inspect, modify, replay and fuzz requests, including HTTPS via its own CA. It is strictly an authorised-testing tool with real MITM power.",
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

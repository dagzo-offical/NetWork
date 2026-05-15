/**
 * Per-topic question bank and topic keyword sets used by both the
 * question-generation API and the answer-validation API.
 */

export interface BankEntry {
  questions: string[];
  keywords: string[];
}

const GENERIC: BankEntry = {
  questions: [
    "{topic} nima ekanligi va ishlab chiqarish tarmog'ida nima uchun muhimligini tushuntiring.",
    "{topic} qanday ishlashini qadam-baqadam, shu jumladan almashinadigan ma'lumotlarni tavsiflab bering.",
    "{topic} bilan bog'liq asosiy xavfsizlik xavflari qanday va ulardan qanday himoyalaniladi?",
    "{topic} ni muqobil yondashuv bilan solishtiring va murosalar haqida tushuntiring.",
    "Paket yozuvida {topic} haqida nima ko'rsatilishini aytib bering.",
    "{topic} ning keng tarqalgan noto'g'ri konfiguratsiyasini va uning oqibatlarini tasvirlab bering.",
  ],
  keywords: [
    "protokol",
    "tarmoq",
    "paket",
    "xavfsizlik",
    "shifrlash",
    "autentifikatsiya",
    "qatlam",
    "sarlavha",
    "mijoz",
    "server",
    "hujum",
    "himoya",
  ],
};

export const QUESTION_BANK: Record<string, BankEntry> = {
  "what-is-a-network": {
    questions: [
      "OSI modeli va TCP/IP modeli o'rtasidagi farqni tushuntiring va nima uchun qatlamlash muhimligini ayting.",
      "Xabar ilova qatlamidan fizik qatlamga tushganda tarmoq stekida nima sodir bo'lishini kuzatib boring.",
      "Nima uchun switch mahalliy tarmoqda samaradorlik ta'minlaydi, lekin xavfsizlik emas?",
      "Tugun, havola, host va protokol atamalarini ta'riflang va ular qanday bog'liqligini tushuntiring.",
    ],
    keywords: ["osi", "tcp/ip", "qatlam", "inkapsulyatsiya", "switch", "mac", "freym", "tugun", "protokol", "fizik", "broadcast"],
  },
  "how-the-internet-works": {
    questions: [
      "Internetning ishlashida Avtonom Tizimlar va BGP ning rolini tushuntiring.",
      "Noutbukingizdan boshqa qit'adagi serverga paket qanday yetib borishini tavsiflab bering.",
      "BGP hijack nima va RPKI uni yumshatishga qanday yordam beradi?",
      "Internet Exchange Pointda peering va tranzit o'rtasidagi farqni tushuntiring.",
    ],
    keywords: ["bgp", "avtonom tizim", "as", "peering", "tranzit", "ixp", "rpki", "hijack", "prefiks", "marshrut", "isp"],
  },
  "tls-handshake": {
    questions: [
      "TLS 1.3 handshake dagi har bir xabarni ketma-ket ko'rib chiqing va maqsadini tushuntiring.",
      "Forward secrecy nima va nima uchun vaqtinchalik Diffie-Hellman uni ta'minlaydi?",
      "TLS 1.3 da 0-RTT ma'lumotlarining xavfsizlik murosasi qanday?",
      "TLS 1.3 protokolni pasaytirish hujumlaridan qanday himoyalanadi?",
    ],
    keywords: ["clienthello", "serverhello", "diffie-hellman", "vaqtinchalik", "forward secrecy", "sertifikat", "kalit ulushi", "0-rtt", "pasaytirish", "hkdf", "aead", "shifrlash"],
  },
  "http-architecture": {
    questions: [
      "HTTP nima uchun holatsiz deb tavsiflanishini va ilovalar holatni qanday qo'shishini tushuntiring.",
      "HTTP so'rov va javob xabarining tuzilmasini tavsiflab bering.",
      "HTTP so'rovini kontrabanda qilish nima va nima sabab bo'ladi?",
      "HTTPS so'rovining DNS dan javobgacha bo'lgan to'liq hayot davrini kuzatib boring.",
    ],
    keywords: ["holatsiz", "so'rov", "javob", "sarlavha", "holat", "tcp", "cookie", "metod", "kontrabanda", "proksi", "keep-alive"],
  },
  "http-methods": {
    questions: [
      "Xavfsiz metod va idempotent metod o'rtasidagi farqni misollar bilan tushuntiring.",
      "GET metodi nima uchun hech qachon holatni o'zgartiruvchi amallar uchun ishlatilmasligi kerak?",
      "CORS preflight da OPTIONS metodining rolini tavsiflab bering.",
      "Qaysi HTTP metodlari idempotent va nima uchun idempotentlik qayta urinishlar uchun muhim?",
    ],
    keywords: ["get", "post", "put", "delete", "patch", "idempotent", "xavfsiz", "options", "cors", "preflight", "kesh"],
  },
  iptables: {
    questions: [
      "iptables da netfilter, jadvallar va zanjirlar o'rtasidagi munosabatni tushuntiring.",
      "Ulanishni kuzatish iptables firewallini holatli qanday qilishini tavsiflab bering.",
      "Minimal standart-DROP host firewallining mantig'ini yozing va har bir qoidani asoslang.",
      "Qaysi iptables xatolari xavfsizlik teshiklarini yaratadi?",
    ],
    keywords: ["netfilter", "zanjir", "jadval", "input", "forward", "conntrack", "holatli", "drop", "accept", "siyosat", "nat", "established"],
  },
  ssh: {
    questions: [
      "SSH ochiq kalit autentifikatsiyasi qanday ishlashini va nima uchun parollardan ustun ekanini tushuntiring.",
      "SSH handshake ni TCP ulanishidan autentifikatsiyalangan sessiyagacha tavsiflab bering.",
      "Bastion host nima va SSH kirishida nima uchun ishlatiladi?",
      "Asosiy sshd_config mustahkamlash direktivlarini sanab o'ting va har birini tushuntiring.",
    ],
    keywords: ["ochiq kalit", "shaxsiy kalit", "authorized_keys", "ecdh", "host kaliti", "bastion", "sakrash", "parol", "kanal", "shifrlash", "mitm"],
  },
  "load-balancing": {
    questions: [
      "4-qatlam va 7-qatlam yukni taqsimlashni va ularning murosalarini solishtiring.",
      "Sog'liq tekshiruvlari va yukni taqsimlash algoritmlari trafikni sog'lom saqlashini tushuntiring.",
      "Yopishqoq sessiyalar nima va ular qanday muammolarga sabab bo'lishi mumkin?",
      "Load balancer ko'k-yashil va canary joylashuvlarni qanday yoqishini tavsiflab bering.",
    ],
    keywords: ["4-qatlam", "7-qatlam", "round-robin", "eng-kam-ulanishlar", "sog'liq tekshiruvi", "yopishqoq", "affinity", "backend", "tls yakunlash", "mavjudlik zonasi"],
  },
  nginx: {
    questions: [
      "NGINX ning hodisaga asoslangan ishchi arxitekturasini va nima uchun u masshtablanishini tushuntiring.",
      "NGINX so'rovni server va location blokiga qanday moslashtirishi ni tavsiflab bering.",
      "NGINX teskari proksiga qanday mustahkamlash qadamlarini qo'llash kerak?",
      "NGINX qanday qilib teskari proksi va load balancer sifatida ishlaydi?",
    ],
    keywords: ["hodisaga asoslangan", "ishchi", "epoll", "server bloki", "location", "teskari proksi", "upstream", "tezlikni cheklash", "tls", "statik", "c10k"],
  },
  apache: {
    questions: [
      "Apache da prefork, worker va event MPM larni solishtiring.",
      ".htaccess fayllarining rolini va xavflarini tushuntiring.",
      "Apache modullar orqali so'rovni qanday qayta ishlashini tavsiflab bering.",
      "Apache da ma'lumot oshkor qilishni kamaytiruvchi mustahkamlash qadamlari qanday?",
    ],
    keywords: ["mpm", "prefork", "worker", "event", "modul", "htaccess", "virtualhost", "mod_security", "servertokens", "thread", "jarayon"],
  },
  caddy: {
    questions: [
      "Caddy ning ACME protokoli orqali avtomatik HTTPS qanday ishlashini tushuntiring.",
      "Avtomatik sertifikat boshqaruvi qanday muammolarni hal qiladi?",
      "Caddy va NGINX o'rtasidagi murosalarni tavsiflab bering.",
      "Caddy da talabga binoan TLS ning xavfsizlik mulohazalari qanday?",
    ],
    keywords: ["acme", "avtomatik https", "sertifikat", "lets encrypt", "caddyfile", "go", "yangilash", "muammo", "binary", "teskari proksi"],
  },
  microservices: {
    questions: [
      "Mikroservislarning asosiy g'oyasini va ular kiritadigan xarajatlarni tushuntiring.",
      "Nima uchun mTLS mikroservislar klasteri ichida muhim?",
      "Mikroservislar arxitekturasida talab qilinadigan chidamlilik naqshlarini tavsiflab bering.",
      "Yon harakat mikroservislarda qanday xavf tug'diradi va u qanday cheklanadi?",
    ],
    keywords: ["xizmat", "mustaqil joylashtiriladi", "cheklangan kontekst", "mtls", "api gateway", "elektr uzgich", "qayta urinish", "vaqt chegarasi", "yon harakat", "kuzatuvchanlik", "tarmoq"],
  },
  monolith: {
    questions: [
      "Monolit arxitekturaning kuchli tomonlarini tushuntiring.",
      "Modulli monolit nima va nima uchun u qimmatli?",
      "Monolit va mikroservislarning hujum yuzasini solishtiring.",
      "Monolitning haqiqiy chegaralari qanday va ular qanday yumshatiladi?",
    ],
    keywords: ["bitta", "joylash", "jarayon-ichida", "ma'lumotlar bazasi", "tranzaksiya", "bog'liqlik", "modulli", "masshtab", "load balancer", "hujum yuzasi"],
  },
  serverless: {
    questions: [
      "FaaS bajarish modelini va sovuq ishga tushirish ma'nosini tushuntiring.",
      "Nima uchun minimal imtiyozli IAM serverlessdagi eng yuqori xavfsizlik masalasidir?",
      "Serverless funksiyalar ostida ishlaydigan cheklovlarni tavsiflab bering.",
      "Qanday yuklamalar serverlessga mos va qaysilari mos emas?",
    ],
    keywords: ["faas", "lambda", "funksiya", "holatsiz", "hodisa", "sovuq ishga tushirish", "iam", "minimal imtiyoz", "masshtablash", "foydalanish uchun to'lov", "tetiklagich"],
  },
  mitm: {
    questions: [
      "O'rtadagi odam hujumi nima ekanligi va u qaysi taxminlarni buZishini tushuntiring.",
      "ARP-spoofing MITM qanday amalga oshirilishini qadam-baqadam tavsiflab bering.",
      "Nima uchun to'g'ri tekshirilgan TLS dushmanlik tarmog'ida ham MITMni mag'lub etadi?",
      "Tajovuzkor o'rtadagi odam pozitsiyasiga erishish uchun qanday texnikalardan foydalanadi?",
    ],
    keywords: ["ushlab qolish", "arp soxtalashtirish", "qallob", "ssl stripping", "autentifikatsiya", "maxfiylik", "tls", "shlyuz", "eshitish", "kiritish", "dnssec"],
  },
  ddos: {
    questions: [
      "DDoS hujumining uch toifasini har biri uchun misol bilan tasniflang.",
      "SYN flood qanday ishlashini va SYN cookie'lar undan qanday himoyalanishini tushuntiring.",
      "Kuchaytirish hujumi nima va nima uchun u juda xavfli?",
      "Anycast tozalash provayderlar hajmli DDoS ni qanday yumshatishini tavsiflab bering.",
    ],
    keywords: ["hajmli", "protokol", "ilova qatlami", "syn flood", "kuchaytirish", "aks ettirish", "anycast", "tozalash", "tezlikni cheklash", "syn cookie", "tarmoq o'tkazuvchanligi"],
  },
  "ids-ips": {
    questions: [
      "IDS va IPS o'rtasidagi farqni tushuntiring.",
      "Imzo asosidagi va anomaliya asosidagi aniqlanishni solishtiring.",
      "Nima uchun shifrlash va parchalanish tajovuzkorgа IDS/IPSni chetlab o'tishga yordam beradi?",
      "NIDS va NIPS tarmoqda qayerda joylashadi va nima uchun?",
    ],
    keywords: ["bosqinchilik", "aniqlash", "oldini olish", "imzo", "anomaliya", "inline", "off-band", "suricata", "snort", "soxta ijobiy", "chetlab o'tish", "siem"],
  },
  wireshark: {
    questions: [
      "Wireshark da ushlash filtrlari va ko'rsatish filtrlari o'rtasidagi farqni tushuntiring.",
      "O'zingizga mo'ljallanmagan trafikni qanday ushlash mumkin?",
      "Wireshark TLS trafikni qanday parolini ochishi mumkin va uning oldinshartlari nima?",
      "Nima uchun Wireshark ushlash fayllari juda maxfiy hisoblanadi?",
    ],
    keywords: ["ushlash filtri", "ko'rsatish filtri", "dissector", "promiskuitet", "span", "tap", "mirror", "pcap", "oqimni kuzatish", "tls", "sslkeylogfile"],
  },
  nmap: {
    questions: [
      "Nmap skanerlashning host kashfiyotidan OS aniqlanishgacha bo'lgan bosqichlarini tushuntiring.",
      "TCP ulanish skanerlashini SYN yarim-ochiq skanerlash bilan solishtiring.",
      "Nmap SYN-ACK, RST va javobsiz holatlarni qanday talqin qiladi?",
      "Nmap ni ishlatishda qanday huquqiy va operatsion ehtiyotkorlik choralari qo'llaniladi?",
    ],
    keywords: ["host kashfiyoti", "port skanerlash", "syn skanerlash", "ulanish skanerlash", "versiya aniqlash", "os barmoq izi", "nse", "ochiq", "filtrlangan", "yopiq", "vaqt"],
  },
  "burp-suite": {
    questions: [
      "Burp Suite HTTPS trafikni qanday ushlab olishini tushuntiring.",
      "Burp ning Proksi, Repeater va Intruder vositalarining maqsadini tavsiflab bering.",
      "Nima uchun Burp ning CA sertifikati faqat testchining mashinasida ishonilishi kerak?",
      "Burp Suite baholashda doiraning roli qanday?",
    ],
    keywords: ["ushlab oluvchi proksi", "repeater", "intruder", "scanner", "ca sertifikat", "mitm", "sayta xaritasi", "doira", "fuzz qilish", "so'rov", "https"],
  },
  tcp: {
    questions: [
      "TCP uch tomonlama handshake ni ko'rib chiqing va har bir segmentning maqsadini tushuntiring.",
      "TCP ishonchsiz IP qatlami ustida ishonchli, tartibli etkazib berishni qanday ta'minlaydi?",
      "TCP oqimni boshqarish va tiqilinchni boshqarishni tushuntiring va ular qanday farqlanadi.",
      "TCP ulanishi qanday to'g'ri yopilishini tavsiflab bering.",
    ],
    keywords: ["uch tomonlama handshake", "syn", "ack", "ketma-ketlik", "tasdiqlash", "ishonchli", "ulanishga asoslangan", "oqimni boshqarish", "tiqilinch", "oyna", "qayta uzatish", "port"],
  },
  udp: {
    questions: [
      "UDP nima uchun ulanishsiz va ishonchsiz deb tavsiflanishini tushuntiring.",
      "UDP ning TCP dan qanday afzalliklari bor va u qachon to'g'ri tanlov?",
      "UDP datagram sarlavhasining tuzilmasini tavsiflab bering.",
      "DNS va QUIC kabi protokollar nima uchun UDP ning ustiga quriladi?",
    ],
    keywords: ["ulanishsiz", "ishonchsiz", "datagram", "handshake yo'q", "past kechikish", "port", "nazorat yig'indisi", "dns", "oqim", "yuk"],
  },
  dns: {
    questions: [
      "Root dan vakolatli servergacha rekursiv DNS hal qilish jarayonini tushuntiring.",
      "DNS da keshlash va TTL ning rolini tavsiflab bering.",
      "DNS soxtalashtirish nima va DNSSEC undan qanday himoyalanadi?",
      "Keng tarqalgan DNS yozuv turlarini va ularning maqsadlarini solishtiring.",
    ],
    keywords: ["resolver", "rekursiv", "vakolatli", "root", "tld", "yozuv", "ttl", "kesh", "a yozuv", "cname", "dnssec", "soxtalashtirish"],
  },
  subnetting: {
    questions: [
      "Subnet niqobi IP manzilni tarmoq va host qismlariga qanday bo'lishini tushuntiring.",
      "/24 tarmoqni to'rtta teng quyi tarmoqqa bo'lishni ko'rib chiqing.",
      "Nima uchun subnetting ishlatiladi va uning xavfsizlik afzalliklari qanday?",
      "Subnet niqobi va foydalanish mumkin bo'lgan hostlar soni o'rtasidagi munosabatni tushuntiring.",
    ],
    keywords: ["subnet niqobi", "tarmoq", "host", "cidr", "broadcast", "prefiks", "bitlar", "segment", "/24", "foydalanish mumkin hostlar", "oktet"],
  },
  "lan-wan-man": {
    questions: [
      "LAN, MAN va WAN ni ko'lam, egalik va ishlash jihatidan solishtiring.",
      "Nima uchun WAN linklarini shifrlash kerak, LAN lar esa yuqori ishonchli?",
      "SD-WAN an'anaviy WAN arxitekturasini qanday o'zgartiradi?",
      "Paketlar bitta saytning LANidan WAN orqali boshqa saytga qanday o'tishini tavsiflab bering.",
    ],
    keywords: ["lan", "wan", "man", "ko'lam", "kechikish", "o'tkazuvchanlik", "mpls", "sd-wan", "ijaraga olingan liniya", "shifrlash", "segment"],
  },
};

export function getBank(lessonId: string, topic: string): BankEntry {
  const entry = QUESTION_BANK[lessonId];
  if (entry) return entry;
  return {
    questions: GENERIC.questions.map((q) => q.replace(/\{topic\}/g, topic)),
    keywords: GENERIC.keywords,
  };
}

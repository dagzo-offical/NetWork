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
    introduction: `${title} is a core building block of modern networking and security. In this lesson we explore what ${topic} is, why it matters, and how it behaves on real production networks.`,
    theory: `At a conceptual level, ${topic} operates within the layered model of networking. Understanding its position in the stack — and how it interacts with the layers above and below — is essential for diagnosing failures and reasoning about security. We examine the protocol/component design goals, its data structures, and the trade-offs its designers made.`,
    realWorldArchitecture: `In production, ${topic} is rarely deployed in isolation. It sits inside a wider architecture of routers, switches, load balancers, firewalls and observability tooling. We look at how enterprises and cloud providers actually wire it up, including redundancy, scaling and failure-domain considerations.`,
    packetFlow: `When traffic involving ${topic} crosses the wire, a precise sequence of frames and packets is exchanged. We trace that flow hop by hop, identifying which fields change at each layer and what a packet capture would reveal.`,
    securityImplications: `${topic} introduces a specific attack surface. Misconfiguration, missing authentication, or trust placed in untrusted inputs can all be abused. We catalogue the realistic threats and the blast radius of each.`,
    attackVectors: [
      {
        name: `${topic} spoofing / forgery`,
        description: `An attacker forges ${topic} messages to impersonate a legitimate host or service.`,
        severity: "High",
      },
      {
        name: `${topic} flooding`,
        description: `Resource exhaustion by overwhelming the component with crafted ${topic} traffic.`,
        severity: "Medium",
      },
    ],
    defenseMethods: [
      `Apply strict input validation on all ${topic} fields.`,
      `Enable authentication / cryptographic integrity where the protocol supports it.`,
      `Rate-limit and monitor ${topic} traffic for anomalies.`,
      `Segment networks so a compromise of ${topic} cannot move laterally.`,
    ],
    configExamples: [
      {
        language: "bash",
        description: `Reference configuration touching ${topic}.`,
        code: `# Inspect ${topic}-related state\nip addr show\nip route show`,
      },
    ],
    cliExamples: [
      {
        language: "bash",
        description: `Diagnostic commands for ${topic}.`,
        code: `ping -c 4 8.8.8.8\ntraceroute 8.8.8.8`,
      },
    ],
    wiresharkAnalysis: `Open a capture and apply a display filter relevant to ${topic}. Inspect the protocol tree, confirm expected field values, and watch for retransmissions, malformed packets or unexpected sources.`,
    commonMistakes: [
      `Assuming ${topic} is trustworthy by default.`,
      `Ignoring edge cases that only appear under load.`,
      `Failing to log and monitor ${topic} behaviour.`,
    ],
    advancedConcepts: `Advanced practitioners tune ${topic} for performance, integrate it with automation pipelines, and reason about its behaviour during partial failures and partitions.`,
    summary: `${title}: you should now be able to explain what ${topic} is, how it works on the wire, the threats it faces, and how to defend it.`,
    diagrams: [
      {
        type: "mermaid",
        title: `${title} — overview`,
        content: `graph LR\n  A[Client] -->|${topic}| B[Service]\n  B --> C[(Backend)]`,
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
  title: "Network Fundamentals",
  description:
    "Build an unshakeable mental model of how data moves across networks — from physical frames to logical addressing, routing and the transport layer.",
  icon: "Network",
  color: "#00ff88",
  totalDuration: "8h 30m",
  lessons: [
    buildLesson(
      "network-fundamentals",
      "what-is-a-network",
      "What Is a Network?",
      "Beginner",
      "20m",
      "computer networks",
      {
        introduction:
          "A network is two or more devices connected so they can exchange data. That simple idea scales from two laptops sharing a cable to billions of devices on the global Internet. This lesson establishes the vocabulary — node, link, host, protocol, topology — that every later lesson depends on.",
        theory:
          "A network is defined by three things: the nodes (endpoints and intermediary devices), the links (the medium carrying signals — copper, fibre, radio), and the protocols (the agreed rules for formatting and exchanging data). Communication is layered: each layer solves one problem and hands a clean abstraction to the layer above. The OSI model defines seven layers (Physical, Data Link, Network, Transport, Session, Presentation, Application); the TCP/IP model collapses these into four (Link, Internet, Transport, Application). Layering is what lets a web browser ignore whether it is running over Wi-Fi or Ethernet.",
        realWorldArchitecture:
          "A typical office network has end devices (laptops, phones) connected to access switches, which uplink to a distribution/core switch, which connects to a router/firewall, which reaches the ISP. Wireless access points bridge radio clients onto the wired LAN. Servers live in a separate VLAN. This access/distribution/core hierarchy keeps broadcast domains small and failure domains contained.",
        packetFlow:
          "When laptop A sends a message to server B on the same LAN: the application produces data, the transport layer adds a TCP/UDP header, the network layer adds an IP header with source/destination IP, the data link layer wraps it in an Ethernet frame with source/destination MAC, and the physical layer encodes bits onto the wire. The switch reads the destination MAC and forwards the frame out only the correct port. B reverses the process — decapsulating each header layer by layer.",
        securityImplications:
          "Every shared medium is an eavesdropping opportunity. On a hub (or compromised switch) any node can see traffic for others. Broadcast traffic reaches every node in a segment. An attacker who plugs into a network port inherits Layer 2 reach to every device in that broadcast domain — which is why physical port security and network segmentation are foundational controls.",
        commonMistakes: [
          "Confusing the OSI model (a teaching abstraction) with how stacks are actually implemented (TCP/IP).",
          "Believing a switch provides security — it provides efficiency, not confidentiality.",
          "Designing one giant flat network with no segmentation.",
        ],
        diagrams: [
          {
            type: "mermaid",
            title: "OSI vs TCP/IP layering",
            content:
              "graph TD\n  subgraph OSI\n    A7[Application] --> A6[Presentation] --> A5[Session] --> A4[Transport] --> A3[Network] --> A2[Data Link] --> A1[Physical]\n  end",
          },
          {
            type: "mermaid",
            title: "Office network topology",
            content:
              "graph TD\n  PC1[Laptop] --> AS[Access Switch]\n  PC2[Phone] --> AS\n  AS --> CS[Core Switch]\n  CS --> FW[Router / Firewall]\n  FW --> ISP[(Internet)]",
          },
        ],
        summary:
          "A network = nodes + links + protocols, organised into layers. Layering decouples concerns; switches forward by MAC; routers forward by IP. Shared media imply eavesdropping risk, so segmentation is a primary security control.",
      }
    ),
    buildLesson(
      "network-fundamentals",
      "how-the-internet-works",
      "How the Internet Works",
      "Beginner",
      "25m",
      "the Internet and autonomous systems",
      {
        introduction:
          "The Internet is not one network — it is a network of ~75,000 independently operated networks (Autonomous Systems) that agree to exchange traffic. This lesson explains how a packet from your laptop reaches a server on another continent.",
        theory:
          "Each Autonomous System (AS) has a unique AS Number and announces the IP prefixes it owns. The Border Gateway Protocol (BGP) is the routing protocol that glues ASes together: every AS tells its neighbours which prefixes it can reach and via what AS-path. Inside an AS, an Interior Gateway Protocol (OSPF or IS-IS) finds shortest paths. The Internet has no central controller — reachability is an emergent property of millions of BGP announcements.",
        realWorldArchitecture:
          "ASes connect at Internet Exchange Points (IXPs) via peering, or buy transit from larger ISPs. Content providers (Google, Netflix, Cloudflare) operate their own global backbones and push content into caches close to users. A request to a popular site usually terminates at a CDN edge node a few milliseconds away, not the origin data centre.",
        packetFlow:
          "You type a URL. DNS resolves the hostname to an IP. Your packet goes to your default gateway, then your ISP's edge router. The ISP consults its BGP table, picks the best AS-path, and forwards toward the destination AS. Each hop decrements the IP TTL. The destination AS's interior routing delivers it to the server. The reply retraces an independent path back.",
        securityImplications:
          "BGP trusts announcements by default. A BGP hijack (announcing prefixes you do not own) can blackhole or intercept traffic — this has caused real global outages. RPKI (Resource Public Key Infrastructure) cryptographically validates that an AS is authorised to announce a prefix, mitigating hijacks.",
        diagrams: [
          {
            type: "mermaid",
            title: "Packet across Autonomous Systems",
            content:
              "graph LR\n  U[Your Laptop] --> ISP[ISP AS]\n  ISP --> IXP[Internet Exchange]\n  IXP --> T[Transit AS]\n  T --> D[Destination AS]\n  D --> S[Server]",
          },
        ],
        attackVectors: [
          {
            name: "BGP prefix hijack",
            description:
              "A malicious or misconfigured AS announces IP prefixes it does not own, attracting and intercepting traffic.",
            severity: "Critical",
          },
          {
            name: "Route leak",
            description:
              "An AS re-announces routes it should not, causing traffic to take an unintended and often congested path.",
            severity: "High",
          },
        ],
        summary:
          "The Internet is a mesh of Autonomous Systems stitched together by BGP. There is no central authority; reachability emerges from announcements. BGP's implicit trust is its biggest weakness, partly fixed by RPKI.",
      }
    ),
    buildLesson(
      "network-fundamentals",
      "lan-wan-man",
      "LAN, WAN & MAN",
      "Beginner",
      "18m",
      "network scope classifications",
      {
        introduction:
          "Networks are classified by geographic scope. LAN, MAN and WAN differ not just in size but in ownership, technology, latency and cost — and those differences drive architecture decisions.",
        theory:
          "A LAN (Local Area Network) spans a building or campus, is privately owned, uses Ethernet/Wi-Fi, and offers high bandwidth with sub-millisecond latency. A MAN (Metropolitan Area Network) spans a city, often built on fibre rings by a carrier. A WAN (Wide Area Network) spans countries or continents, is typically leased from carriers, and exhibits higher latency and lower per-bit bandwidth. The Internet is the largest WAN.",
        realWorldArchitecture:
          "An enterprise runs LANs at each site. Sites are stitched together over a WAN using MPLS circuits, leased lines, or increasingly SD-WAN overlays that ride the public Internet with encryption and intelligent path selection. A MAN might connect several campuses within one city using carrier dark fibre.",
        packetFlow:
          "Within a LAN, frames are switched at Layer 2 with no routing. Crossing to another site, packets are routed at Layer 3, encapsulated for WAN transport (e.g. in MPLS labels or an IPsec tunnel), carried across the carrier network, then decapsulated and switched onto the remote LAN.",
        securityImplications:
          "WAN links traverse infrastructure you do not control, so confidentiality requires encryption (IPsec, MACsec, TLS). LANs are higher-trust but still need segmentation. SD-WAN concentrates security policy but also becomes a high-value target.",
        diagrams: [
          {
            type: "mermaid",
            title: "Connecting LANs over a WAN",
            content:
              "graph LR\n  subgraph Site A LAN\n    A1[Hosts] --> AR[Router]\n  end\n  subgraph Site B LAN\n    B1[Hosts] --> BR[Router]\n  end\n  AR -->|Encrypted WAN tunnel| BR",
          },
        ],
        summary:
          "LAN = building, private, fast. MAN = city scale. WAN = global, leased, higher latency. Architecture and security controls follow scope: switch inside LANs, route and encrypt across WANs.",
      }
    ),
    buildLesson("network-fundamentals", "switch-vs-router", "Switch vs Router", "Beginner", "22m", "switches and routers"),
    buildLesson("network-fundamentals", "mac-addresses", "MAC Addresses", "Beginner", "18m", "MAC addressing"),
    buildLesson("network-fundamentals", "ipv4-addressing", "IPv4 Addressing", "Beginner", "25m", "IPv4 addressing"),
    buildLesson("network-fundamentals", "ipv6-addressing", "IPv6 Addressing", "Intermediate", "25m", "IPv6 addressing"),
    buildLesson("network-fundamentals", "subnetting", "Subnetting", "Intermediate", "30m", "subnetting"),
    buildLesson("network-fundamentals", "cidr", "CIDR Notation", "Intermediate", "20m", "CIDR"),
    buildLesson("network-fundamentals", "default-gateway", "The Default Gateway", "Beginner", "15m", "default gateways"),
    buildLesson("network-fundamentals", "nat", "Network Address Translation (NAT)", "Intermediate", "25m", "NAT"),
    buildLesson("network-fundamentals", "dns", "DNS — Domain Name System", "Beginner", "28m", "DNS"),
    buildLesson("network-fundamentals", "dhcp", "DHCP — Dynamic Host Configuration", "Beginner", "20m", "DHCP"),
    buildLesson("network-fundamentals", "arp", "ARP — Address Resolution Protocol", "Intermediate", "20m", "ARP"),
    buildLesson("network-fundamentals", "icmp", "ICMP — The Diagnostic Protocol", "Beginner", "18m", "ICMP"),
    buildLesson("network-fundamentals", "tcp", "TCP — Transmission Control Protocol", "Intermediate", "30m", "TCP"),
    buildLesson("network-fundamentals", "udp", "UDP — User Datagram Protocol", "Beginner", "18m", "UDP"),
    buildLesson("network-fundamentals", "ports", "Ports & Port Numbers", "Beginner", "15m", "TCP/UDP ports"),
    buildLesson("network-fundamentals", "sockets", "Sockets", "Intermediate", "20m", "network sockets"),
    buildLesson("network-fundamentals", "osi-model", "The OSI Model in Depth", "Intermediate", "25m", "the OSI model"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 2 — HTTP / HTTPS / TLS / SSL                                    */
/* ----------------------------------------------------------------------- */

const section2: CourseSection = {
  id: "http-tls",
  title: "HTTP, HTTPS, TLS & SSL",
  description:
    "Master the protocols of the modern web — from request methods and headers to the cryptographic handshake that secures every connection.",
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
    buildLesson("http-tls", "http-headers", "HTTP Headers", "Beginner", "22m", "HTTP headers"),
    buildLesson("http-tls", "cookies", "Cookies", "Beginner", "20m", "HTTP cookies"),
    buildLesson("http-tls", "sessions", "Sessions", "Intermediate", "22m", "web sessions"),
    buildLesson("http-tls", "authentication", "Authentication", "Intermediate", "28m", "web authentication"),
    buildLesson("http-tls", "authorization", "Authorization", "Intermediate", "25m", "authorization"),
    buildLesson("http-tls", "https", "HTTPS", "Beginner", "20m", "HTTPS"),
    buildLesson("http-tls", "ssl", "SSL — History & Legacy", "Intermediate", "18m", "SSL"),
    buildLesson("http-tls", "tls", "TLS — Transport Layer Security", "Intermediate", "25m", "TLS"),
    buildLesson("http-tls", "ssl-handshake", "The SSL/TLS 1.2 Handshake", "Advanced", "30m", "the TLS 1.2 handshake"),
    buildLesson("http-tls", "certificates", "X.509 Certificates", "Intermediate", "25m", "X.509 certificates"),
    buildLesson("http-tls", "certificate-authorities", "Certificate Authorities", "Intermediate", "20m", "certificate authorities"),
    buildLesson("http-tls", "pki", "Public Key Infrastructure (PKI)", "Advanced", "28m", "PKI"),
    buildLesson("http-tls", "rsa", "RSA Cryptography", "Advanced", "28m", "RSA"),
    buildLesson("http-tls", "aes", "AES Symmetric Encryption", "Advanced", "25m", "AES"),
    buildLesson("http-tls", "diffie-hellman", "Diffie-Hellman Key Exchange", "Advanced", "25m", "Diffie-Hellman"),
    buildLesson("http-tls", "hsts", "HSTS", "Intermediate", "15m", "HSTS"),
    buildLesson("http-tls", "csp", "Content Security Policy (CSP)", "Intermediate", "22m", "CSP"),
    buildLesson("http-tls", "sop", "Same-Origin Policy", "Intermediate", "20m", "the Same-Origin Policy"),
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
  title: "Web Servers",
  description:
    "Compare and operate the major web servers — Apache, NGINX, IIS, Caddy and Tomcat — their architectures, configuration and security hardening.",
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
    buildLesson("web-servers", "iis", "Microsoft IIS", "Intermediate", "25m", "Microsoft IIS"),
    buildLesson("web-servers", "tomcat", "Apache Tomcat", "Intermediate", "25m", "Apache Tomcat"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 4 — SERVER INFRASTRUCTURE                                       */
/* ----------------------------------------------------------------------- */

const section4: CourseSection = {
  id: "server-infrastructure",
  title: "Server Infrastructure",
  description:
    "From bare metal to cloud, firewalls to service mesh — understand the infrastructure that hosts and protects modern applications.",
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
    buildLesson("server-infrastructure", "dedicated-server", "Dedicated Servers", "Beginner", "18m", "dedicated servers"),
    buildLesson("server-infrastructure", "vps", "Virtual Private Servers (VPS)", "Beginner", "18m", "VPS hosting"),
    buildLesson("server-infrastructure", "cloud-computing", "Cloud Computing", "Beginner", "22m", "cloud computing"),
    buildLesson("server-infrastructure", "aws", "Amazon Web Services (AWS)", "Intermediate", "28m", "AWS"),
    buildLesson("server-infrastructure", "azure", "Microsoft Azure", "Intermediate", "25m", "Microsoft Azure"),
    buildLesson("server-infrastructure", "gcp", "Google Cloud Platform", "Intermediate", "25m", "Google Cloud Platform"),
    buildLesson("server-infrastructure", "linux-networking", "Linux Networking", "Intermediate", "28m", "Linux networking"),
    buildLesson("server-infrastructure", "firewalls", "Firewalls", "Intermediate", "25m", "firewalls"),
    buildLesson("server-infrastructure", "ufw", "UFW — Uncomplicated Firewall", "Beginner", "15m", "UFW"),
    buildLesson("server-infrastructure", "vpn", "VPNs", "Intermediate", "28m", "VPNs"),
    buildLesson("server-infrastructure", "reverse-proxy", "Reverse Proxies", "Intermediate", "22m", "reverse proxies"),
    buildLesson("server-infrastructure", "cdn", "Content Delivery Networks", "Intermediate", "25m", "CDNs"),
    buildLesson("server-infrastructure", "haproxy", "HAProxy", "Advanced", "25m", "HAProxy"),
    buildLesson("server-infrastructure", "docker-networking", "Docker Networking", "Advanced", "28m", "Docker networking"),
    buildLesson("server-infrastructure", "kubernetes-networking", "Kubernetes Networking", "Advanced", "32m", "Kubernetes networking"),
    buildLesson("server-infrastructure", "service-mesh", "Service Mesh", "Advanced", "28m", "service mesh"),
    buildLesson("server-infrastructure", "zero-trust", "Zero Trust Architecture", "Advanced", "28m", "Zero Trust"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 5 — SOFTWARE ARCHITECTURE                                       */
/* ----------------------------------------------------------------------- */

const section5: CourseSection = {
  id: "software-architecture",
  title: "Software Architecture",
  description:
    "Architectural styles that shape how systems scale, fail and evolve — monoliths, microservices, serverless, event-driven and hybrid designs.",
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
    buildLesson("software-architecture", "event-driven", "Event-Driven Architecture", "Advanced", "28m", "event-driven architecture"),
    buildLesson("software-architecture", "hybrid-architecture", "Hybrid Architecture", "Advanced", "25m", "hybrid architecture"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 6 — NETWORK SECURITY                                            */
/* ----------------------------------------------------------------------- */

const section6: CourseSection = {
  id: "network-security",
  title: "Network Security",
  description:
    "Attacks and defences — from man-in-the-middle and DDoS to IDS/IPS, SIEM and the colour-coded teams of modern cyber operations.",
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
    buildLesson("network-security", "ssl-stripping", "SSL Stripping", "Advanced", "22m", "SSL stripping"),
    buildLesson("network-security", "syn-flood", "SYN Flood Attacks", "Intermediate", "20m", "SYN flood attacks"),
    buildLesson("network-security", "port-scanning", "Port Scanning", "Intermediate", "22m", "port scanning"),
    buildLesson("network-security", "enumeration", "Enumeration", "Intermediate", "22m", "network enumeration"),
    buildLesson("network-security", "siem", "SIEM", "Intermediate", "25m", "SIEM"),
    buildLesson("network-security", "waf", "Web Application Firewalls", "Intermediate", "25m", "WAFs"),
    buildLesson("network-security", "zero-day", "Zero-Day Vulnerabilities", "Advanced", "22m", "zero-day vulnerabilities"),
    buildLesson("network-security", "threat-intelligence", "Threat Intelligence", "Intermediate", "22m", "threat intelligence"),
    buildLesson("network-security", "soc", "Security Operations Center (SOC)", "Intermediate", "25m", "the SOC"),
    buildLesson("network-security", "blue-team", "Blue Team Operations", "Intermediate", "22m", "blue team operations"),
    buildLesson("network-security", "red-team", "Red Team Operations", "Advanced", "25m", "red team operations"),
    buildLesson("network-security", "purple-team", "Purple Team Operations", "Advanced", "22m", "purple team operations"),
    buildLesson("network-security", "incident-response", "Incident Response", "Intermediate", "28m", "incident response"),
  ],
};

/* ----------------------------------------------------------------------- */
/* SECTION 7 — PENETRATION TESTING                                         */
/* ----------------------------------------------------------------------- */

const section7: CourseSection = {
  id: "pentesting",
  title: "Penetration Testing",
  description:
    "The professional pentester's toolkit — Wireshark, Burp Suite, Nmap, Metasploit and more — used legally and effectively.",
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

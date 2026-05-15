/**
 * Per-topic question bank and topic keyword sets used by both the
 * question-generation API and the answer-validation API.
 */

export interface BankEntry {
  /** Free-form written questions for this topic. */
  questions: string[];
  /** Technical keywords that a strong answer for this topic should contain. */
  keywords: string[];
}

/** Generic networking questions used when a topic has no specific bank. */
const GENERIC: BankEntry = {
  questions: [
    "Explain what {topic} is and why it matters in a production network.",
    "Describe how {topic} works step by step, including the data exchanged.",
    "What are the main security risks associated with {topic}, and how do you defend against them?",
    "Compare {topic} with an alternative approach and explain the trade-offs.",
    "Walk through what a packet capture would reveal about {topic}.",
    "Describe a common misconfiguration of {topic} and its consequences.",
  ],
  keywords: [
    "protocol",
    "network",
    "packet",
    "security",
    "encryption",
    "authentication",
    "layer",
    "header",
    "client",
    "server",
    "attack",
    "defense",
  ],
};

export const QUESTION_BANK: Record<string, BankEntry> = {
  "what-is-a-network": {
    questions: [
      "Explain the difference between the OSI model and the TCP/IP model, and why layering matters.",
      "Trace what happens to a message as it travels down the network stack from application to physical layer.",
      "Why does a switch provide efficiency but not security on a local network?",
      "Define the terms node, link, host and protocol, and explain how they relate.",
    ],
    keywords: ["osi", "tcp/ip", "layer", "encapsulation", "switch", "mac", "frame", "node", "protocol", "physical", "broadcast"],
  },
  "how-the-internet-works": {
    questions: [
      "Explain the role of Autonomous Systems and BGP in making the Internet work.",
      "Describe how a packet from your laptop reaches a server on another continent.",
      "What is a BGP hijack and how does RPKI help mitigate it?",
      "Explain the difference between peering and transit at an Internet Exchange Point.",
    ],
    keywords: ["bgp", "autonomous system", "as", "peering", "transit", "ixp", "rpki", "hijack", "prefix", "route", "isp"],
  },
  "tls-handshake": {
    questions: [
      "Walk through every message of the TLS 1.3 handshake and explain its purpose.",
      "Explain forward secrecy and why ephemeral Diffie-Hellman provides it.",
      "What is the security trade-off of 0-RTT data in TLS 1.3?",
      "How does TLS 1.3 defend against protocol downgrade attacks?",
    ],
    keywords: ["clienthello", "serverhello", "diffie-hellman", "ephemeral", "forward secrecy", "certificate", "key share", "0-rtt", "downgrade", "hkdf", "aead", "encryption"],
  },
  "http-architecture": {
    questions: [
      "Explain why HTTP is described as stateless and how applications add state.",
      "Describe the structure of an HTTP request and response message.",
      "What is HTTP request smuggling and what causes it?",
      "Trace the full lifecycle of an HTTPS request from DNS to response.",
    ],
    keywords: ["stateless", "request", "response", "header", "status", "tcp", "cookie", "method", "smuggling", "proxy", "keep-alive"],
  },
  "http-methods": {
    questions: [
      "Explain the difference between a safe method and an idempotent method, with examples.",
      "Why should GET never be used for state-changing operations?",
      "Describe the role of the OPTIONS method in CORS preflight.",
      "Which HTTP methods are idempotent and why does idempotency matter for retries?",
    ],
    keywords: ["get", "post", "put", "delete", "patch", "idempotent", "safe", "options", "cors", "preflight", "cache"],
  },
  iptables: {
    questions: [
      "Explain the relationship between netfilter, tables and chains in iptables.",
      "Describe how connection tracking makes an iptables firewall stateful.",
      "Write the logic of a minimal default-DROP host firewall and justify each rule.",
      "What common iptables mistakes create security holes?",
    ],
    keywords: ["netfilter", "chain", "table", "input", "forward", "conntrack", "stateful", "drop", "accept", "policy", "nat", "established"],
  },
  ssh: {
    questions: [
      "Explain how SSH public-key authentication works and why it beats passwords.",
      "Describe the SSH handshake from TCP connection to authenticated session.",
      "What is a bastion host and why is it used for SSH access?",
      "List the key sshd_config hardening directives and explain each.",
    ],
    keywords: ["public key", "private key", "authorized_keys", "ecdh", "host key", "bastion", "jump", "password", "channel", "encryption", "mitm"],
  },
  "load-balancing": {
    questions: [
      "Compare Layer 4 and Layer 7 load balancing and their trade-offs.",
      "Explain how health checks and load-balancing algorithms keep traffic healthy.",
      "What are sticky sessions and what problems can they cause?",
      "Describe how a load balancer enables blue-green and canary deployments.",
    ],
    keywords: ["layer 4", "layer 7", "round-robin", "least-connections", "health check", "sticky", "affinity", "backend", "tls termination", "availability zone"],
  },
  nginx: {
    questions: [
      "Explain NGINX's event-driven worker architecture and why it scales.",
      "Describe how NGINX matches a request to a server and location block.",
      "What hardening steps should you apply to an NGINX reverse proxy?",
      "How does NGINX function as a reverse proxy and load balancer?",
    ],
    keywords: ["event-driven", "worker", "epoll", "server block", "location", "reverse proxy", "upstream", "rate limit", "tls", "static", "c10k"],
  },
  apache: {
    questions: [
      "Compare the prefork, worker and event MPMs in Apache.",
      "Explain the role and risks of .htaccess files.",
      "Describe how Apache processes a request through its modules.",
      "What hardening steps reduce information disclosure in Apache?",
    ],
    keywords: ["mpm", "prefork", "worker", "event", "module", "htaccess", "virtualhost", "mod_security", "servertokens", "thread", "process"],
  },
  caddy: {
    questions: [
      "Explain how Caddy's automatic HTTPS works via the ACME protocol.",
      "What problems does automatic certificate management solve?",
      "Describe the trade-offs of Caddy versus NGINX.",
      "What are the security considerations of on-demand TLS in Caddy?",
    ],
    keywords: ["acme", "automatic https", "certificate", "lets encrypt", "caddyfile", "go", "renewal", "challenge", "binary", "reverse proxy"],
  },
  microservices: {
    questions: [
      "Explain the core idea of microservices and the costs they introduce.",
      "Why is mTLS important inside a microservices cluster?",
      "Describe the resilience patterns required in a microservices architecture.",
      "How does lateral movement become a risk in microservices, and how is it limited?",
    ],
    keywords: ["service", "independently deployable", "bounded context", "mtls", "api gateway", "circuit breaker", "retry", "timeout", "lateral movement", "observability", "network"],
  },
  monolith: {
    questions: [
      "Explain the strengths of a monolithic architecture.",
      "What is a modular monolith and why is it valuable?",
      "Compare the attack surface of a monolith versus microservices.",
      "What are the genuine limitations of a monolith and how are they mitigated?",
    ],
    keywords: ["single", "deployment", "in-process", "database", "transaction", "coupling", "modular", "scale", "load balancer", "attack surface"],
  },
  serverless: {
    questions: [
      "Explain the FaaS execution model and the meaning of a cold start.",
      "Why is least-privilege IAM the top security concern in serverless?",
      "Describe the constraints serverless functions operate under.",
      "What workloads fit serverless well, and which do not?",
    ],
    keywords: ["faas", "lambda", "function", "stateless", "event", "cold start", "iam", "least privilege", "scaling", "pay-per-use", "trigger"],
  },
  mitm: {
    questions: [
      "Explain what a man-in-the-middle attack is and the assumptions it violates.",
      "Describe step by step how an ARP-spoofing MITM is carried out.",
      "Why does properly-validated TLS defeat a MITM even on a hostile network?",
      "List the techniques an attacker uses to gain a man-in-the-middle position.",
    ],
    keywords: ["intercept", "arp spoofing", "rogue", "ssl stripping", "authentication", "confidentiality", "tls", "gateway", "eavesdrop", "inject", "dnssec"],
  },
  ddos: {
    questions: [
      "Classify the three categories of DDoS attack with an example of each.",
      "Explain how a SYN flood works and how SYN cookies defend against it.",
      "What is an amplification attack and why is it so dangerous?",
      "Describe how anycast scrubbing providers mitigate volumetric DDoS.",
    ],
    keywords: ["volumetric", "protocol", "application layer", "syn flood", "amplification", "reflection", "anycast", "scrubbing", "rate limit", "syn cookie", "bandwidth"],
  },
  "ids-ips": {
    questions: [
      "Explain the difference between an IDS and an IPS.",
      "Compare signature-based and anomaly-based detection.",
      "Why do encryption and fragmentation help attackers evade an IDS/IPS?",
      "Describe where a NIDS and a NIPS sit in the network and why.",
    ],
    keywords: ["intrusion", "detection", "prevention", "signature", "anomaly", "inline", "out-of-band", "suricata", "snort", "false positive", "evasion", "siem"],
  },
  wireshark: {
    questions: [
      "Explain the difference between capture filters and display filters in Wireshark.",
      "How can you capture traffic that is not destined for your own machine?",
      "Describe how Wireshark can decrypt TLS traffic and the prerequisites.",
      "Why are Wireshark capture files considered highly sensitive?",
    ],
    keywords: ["capture filter", "display filter", "dissector", "promiscuous", "span", "tap", "mirror", "pcap", "follow stream", "tls", "sslkeylogfile"],
  },
  nmap: {
    questions: [
      "Explain the phases of an Nmap scan from host discovery to OS detection.",
      "Compare a TCP connect scan with a SYN half-open scan.",
      "How does Nmap interpret SYN-ACK, RST and no-reply responses?",
      "What legal and operational precautions apply when using Nmap?",
    ],
    keywords: ["host discovery", "port scan", "syn scan", "connect scan", "version detection", "os fingerprint", "nse", "open", "filtered", "closed", "timing"],
  },
  "burp-suite": {
    questions: [
      "Explain how Burp Suite intercepts HTTPS traffic.",
      "Describe the purpose of Burp's Proxy, Repeater and Intruder tools.",
      "Why must Burp's CA certificate only be trusted on the tester's machine?",
      "What is the role of scope in a Burp Suite assessment?",
    ],
    keywords: ["intercepting proxy", "repeater", "intruder", "scanner", "ca certificate", "mitm", "site map", "scope", "fuzzing", "request", "https"],
  },
  tcp: {
    questions: [
      "Walk through the TCP three-way handshake and explain the purpose of each segment.",
      "How does TCP provide reliable, ordered delivery on top of an unreliable IP layer?",
      "Explain TCP flow control and congestion control and how they differ.",
      "Describe how a TCP connection is closed gracefully.",
    ],
    keywords: ["three-way handshake", "syn", "ack", "sequence", "acknowledgement", "reliable", "connection-oriented", "flow control", "congestion", "window", "retransmission", "port"],
  },
  udp: {
    questions: [
      "Explain why UDP is described as connectionless and unreliable.",
      "What advantages does UDP have over TCP, and when is it the right choice?",
      "Describe the structure of a UDP datagram header.",
      "Why do protocols like DNS and QUIC build on UDP?",
    ],
    keywords: ["connectionless", "unreliable", "datagram", "no handshake", "low latency", "port", "checksum", "dns", "streaming", "overhead"],
  },
  dns: {
    questions: [
      "Explain the recursive DNS resolution process from root to authoritative server.",
      "Describe the role of caching and TTL in DNS.",
      "What is DNS spoofing and how does DNSSEC defend against it?",
      "Compare the common DNS record types and their purposes.",
    ],
    keywords: ["resolver", "recursive", "authoritative", "root", "tld", "record", "ttl", "cache", "a record", "cname", "dnssec", "spoofing"],
  },
  subnetting: {
    questions: [
      "Explain how a subnet mask divides an IP address into network and host portions.",
      "Walk through subnetting a /24 network into four equal subnets.",
      "Why is subnetting used, and what are its security benefits?",
      "Explain the relationship between subnet mask and number of usable hosts.",
    ],
    keywords: ["subnet mask", "network", "host", "cidr", "broadcast", "prefix", "bits", "segment", "/24", "usable hosts", "octet"],
  },
  "lan-wan-man": {
    questions: [
      "Compare LAN, MAN and WAN in terms of scope, ownership and performance.",
      "Why must WAN links be encrypted while LANs are higher-trust?",
      "Explain how SD-WAN changes traditional WAN architecture.",
      "Describe how packets move from one site's LAN to another over a WAN.",
    ],
    keywords: ["lan", "wan", "man", "scope", "latency", "bandwidth", "mpls", "sd-wan", "leased line", "encryption", "segment"],
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

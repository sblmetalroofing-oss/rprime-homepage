import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  Hammer,
  Layers,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Smartphone,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
  Wrench,
  Paintbrush,
  Plug,
  Wind,
  TreePine,
  Building2,
  HardHat,
  Globe,
  CreditCard,
} from 'lucide-react';

/* ─────────────────────────── hooks ─────────────────────────── */

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return { ref, count };
}

/* Reveal wrapper */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── data ─────────────────────────── */

const NAV_LINKS = ['Features', 'Pricing', 'Industries', 'FAQ'];

const STATS = [
  { value: 2500, suffix: '+', label: 'Trade businesses' },
  { value: 150, suffix: 'K+', label: 'Jobs managed' },
  { value: 30, suffix: '%', label: 'Less admin time' },
  { value: 4.9, suffix: '', label: 'App store rating', isDecimal: true },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'Job Pipeline',
    desc: 'Visual kanban board tracks every job from enquiry to completion. Drag, drop, done.',
    size: 'large' as const,
  },
  {
    icon: FileText,
    title: 'Quotes & Invoices',
    desc: 'Professional quotes in minutes. Convert to invoices with one tap. Get paid faster.',
    size: 'medium' as const,
  },
  {
    icon: CalendarDays,
    title: 'Scheduling',
    desc: "Drag-and-drop calendar. See who's available. No more double bookings.",
    size: 'medium' as const,
  },
  {
    icon: BarChart3,
    title: 'Xero & MYOB Sync',
    desc: 'Two-way sync keeps your books up to date automatically.',
    size: 'small' as const,
  },
  {
    icon: Smartphone,
    title: 'Mobile Crew App',
    desc: "Your crew gets today's jobs, checklists, and photo uploads on their phone.",
    size: 'small' as const,
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    desc: 'Auto-generate scope of works, job descriptions, and client emails.',
    size: 'small' as const,
  },
];

const INDUSTRIES = [
  { icon: Wrench, name: 'Plumbing', desc: 'From residential leaks to commercial fitouts' },
  { icon: Plug, name: 'Electrical', desc: 'Manage switchboard upgrades to full rewires' },
  { icon: Wind, name: 'HVAC', desc: 'Track installs, servicing and maintenance' },
  { icon: HardHat, name: 'Roofing', desc: 'Inspections, restorations and new roofs' },
  { icon: Building2, name: 'Building', desc: 'Residential and commercial builds on budget' },
  { icon: TreePine, name: 'Landscaping', desc: 'Quote, schedule and invoice outdoor jobs' },
  { icon: Paintbrush, name: 'Painting', desc: 'Colour schedules, room-by-room quoting' },
  { icon: Hammer, name: 'General Trades', desc: 'Carpentry, tiling, fencing and more' },
];

const STEPS = [
  {
    num: '01',
    title: 'Create a job in seconds',
    desc: 'Add client details, site info, and scope — or let AI draft it for you.',
    icon: ClipboardList,
  },
  {
    num: '02',
    title: 'Quote, schedule & assign',
    desc: 'Send professional quotes, lock in dates, and assign your crew from one screen.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Invoice & get paid on the spot',
    desc: 'Convert completed jobs to invoices with one tap. Accept payment right there.',
    icon: CreditCard,
  },
];

const TESTIMONIALS = [
  {
    quote:
      'RPrime cut our admin from a full day per week to about an hour. The crew app alone is worth it — no more phone calls to check job status.',
    name: 'Jake M.',
    role: 'Director',
    company: 'Summit Electrical',
    stars: 5,
  },
  {
    quote:
      'We went from losing track of quotes to converting 40% more. The pipeline view means nothing falls through the cracks anymore.',
    name: 'Sarah T.',
    role: 'Operations Manager',
    company: 'ClearFlow Plumbing',
    stars: 5,
  },
  {
    quote:
      'Finally software that gets how tradies actually work. Simple to use, powerful when you need it, and the Xero sync is flawless.',
    name: 'Marcus W.',
    role: 'Owner',
    company: 'Coastal HVAC Solutions',
    stars: 5,
  },
];

const INTEGRATIONS = [
  { name: 'Xero', desc: 'Accounting' },
  { name: 'Stripe', desc: 'Payments' },
  { name: 'Google', desc: 'Calendar' },
  { name: 'Apple', desc: 'Maps' },
  { name: 'MYOB', desc: 'Accounting' },
];

const PRICING = [
  {
    name: 'Starter',
    price: 29,
    desc: 'For solo tradies getting organised',
    features: [
      'Up to 2 users',
      'Job pipeline',
      'Quotes & invoices',
      'Mobile crew app',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 59,
    desc: 'For growing trade businesses',
    features: [
      'Up to 10 users',
      'Everything in Starter',
      'Scheduling & calendar',
      'Xero/MYOB sync',
      'AI assistant',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Business',
    price: 99,
    desc: 'For established operations',
    features: [
      'Unlimited users',
      'Everything in Professional',
      'Custom branding',
      'Advanced reporting',
      'API access',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
];

const FAQS = [
  {
    q: 'Is RPrime just for roofers?',
    a: 'Not at all! RPrime is built for any trade — plumbers, electricians, builders, HVAC, landscapers, painters, and more. If you manage jobs, quotes, and crew, RPrime is for you.',
  },
  {
    q: 'How long is the free trial?',
    a: "14 days, full access, no credit card required. Use every feature and decide if it's right for your business.",
  },
  {
    q: 'Can my crew use it on their phones?',
    a: 'Yes. RPrime has a dedicated mobile crew app where your team can see their jobs, checklists, upload photos, and update status — all from the field.',
  },
  {
    q: 'Does it sync with my accounting software?',
    a: 'RPrime integrates with Xero and MYOB out of the box. Invoices, payments, and contacts sync automatically — no double entry.',
  },
  {
    q: 'Can I import my existing data?',
    a: 'Absolutely. We support bulk import of clients, jobs, and price lists via CSV. Our team can also help migrate your data for free.',
  },
  {
    q: 'Is my data secure?',
    a: 'Your data is encrypted at rest and in transit. We use PostgreSQL with automated backups, hosted on Australian infrastructure. We never share your data.',
  },
  {
    q: 'What support do you offer?',
    a: 'All plans include email support. Professional and Business plans get priority support plus access to our live chat during business hours.',
  },
];

/* ─────────────────────────── mockup components ─────────────────────────── */

const MOCK_JOBS = [
  {
    id: 'J-1047',
    client: 'Mitchell Residence',
    status: 'In Progress',
    value: '$8,750',
    crew: 'Alpha',
    color: 'bg-emerald-500',
  },
  {
    id: 'J-1048',
    client: 'Metro Tower L3',
    status: 'Quoted',
    value: '$24,200',
    crew: '—',
    color: 'bg-amber-500',
  },
  {
    id: 'J-1049',
    client: 'Coastal Reno',
    status: 'Scheduled',
    value: '$12,400',
    crew: 'Bravo',
    color: 'bg-blue-500',
  },
  {
    id: 'J-1050',
    client: 'Henderson Kitchen',
    status: 'New',
    value: '$3,900',
    crew: '—',
    color: 'bg-slate-400',
  },
  {
    id: 'J-1051',
    client: 'Park Ridge Fitout',
    status: 'Complete',
    value: '$15,800',
    crew: 'Alpha',
    color: 'bg-violet-500',
  },
  {
    id: 'J-1052',
    client: 'Brisbane CBD Office',
    status: 'In Progress',
    value: '$31,500',
    crew: 'Charlie',
    color: 'bg-emerald-500',
  },
];

function DashboardMockup() {
  return (
    <div className="aspect-[16/9] bg-[#0c1120] flex text-[10px] sm:text-xs overflow-hidden select-none">
      {/* Sidebar */}
      <div className="w-12 sm:w-14 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
          <Layers className="w-3 h-3 text-white" />
        </div>
        <div className="w-1 h-1 rounded-full bg-white/10 my-1" />
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users, BarChart3].map(
          (Icon, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-orange-500/15' : 'hover:bg-white/[0.04]'} transition-colors`}
            >
              <Icon className={`w-3.5 h-3.5 ${i === 0 ? 'text-orange-400' : 'text-slate-500'}`} />
            </div>
          )
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-bold text-sm sm:text-base font-[Barlow]">Dashboard</p>
            <p className="text-slate-500 text-[9px] sm:text-[10px]">Welcome back, Jake</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 text-orange-400" />
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[8px] text-white font-bold">
              JM
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Active Jobs', val: '12', trend: '+3', trendUp: true },
            { label: 'Quotes Pending', val: '5', trend: '2 due', trendUp: false },
            { label: 'Revenue (MTD)', val: '$48.2K', trend: '+18%', trendUp: true },
            { label: 'On-Time Rate', val: '97%', trend: '+2%', trendUp: true },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2"
            >
              <p className="text-slate-500 text-[8px] sm:text-[9px] truncate">{s.label}</p>
              <p className="text-white font-bold text-sm sm:text-base font-[Barlow] mt-0.5">
                {s.val}
              </p>
              <p
                className={`text-[8px] mt-0.5 ${s.trendUp ? 'text-emerald-400' : 'text-amber-400'}`}
              >
                {s.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Pipeline columns */}
        <div className="flex items-center gap-1 mb-2">
          <p className="text-white font-semibold text-[10px] sm:text-xs font-[Barlow]">
            Job Pipeline
          </p>
          <div className="flex-1" />
          <div className="text-[8px] text-slate-500 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
            This Week
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5 flex-1">
          {['New', 'Quoted', 'Scheduled', 'In Progress', 'Complete'].map((col, _ci) => {
            const colJobs = MOCK_JOBS.filter((j) =>
              col === 'New'
                ? j.status === 'New'
                : col === 'Quoted'
                  ? j.status === 'Quoted'
                  : col === 'Scheduled'
                    ? j.status === 'Scheduled'
                    : col === 'In Progress'
                      ? j.status === 'In Progress'
                      : j.status === 'Complete'
            );
            return (
              <div key={col} className="flex flex-col">
                <div className="flex items-center gap-1 mb-1.5">
                  <p className="text-[8px] sm:text-[9px] text-slate-400 font-medium truncate">
                    {col}
                  </p>
                  <span className="text-[7px] bg-white/[0.06] text-slate-500 rounded-full px-1">
                    {colJobs.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {colJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-md border border-white/[0.06] bg-white/[0.02] p-1.5 hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${job.color}`} />
                        <p className="text-[7px] sm:text-[8px] text-slate-400 truncate">{job.id}</p>
                      </div>
                      <p className="text-[8px] sm:text-[9px] text-white font-medium truncate">
                        {job.client}
                      </p>
                      <p className="text-[7px] text-orange-400 mt-0.5">{job.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MiniPipelineMockup() {
  return (
    <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 select-none">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: 'New', count: 2, color: 'bg-slate-400' },
          { label: 'Quoted', count: 3, color: 'bg-amber-500' },
          { label: 'Active', count: 5, color: 'bg-emerald-500' },
          { label: 'Done', count: 8, color: 'bg-violet-500' },
        ].map((col) => (
          <div key={col.label}>
            <div className="flex items-center gap-1 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${col.color}`} />
              <span className="text-[9px] text-slate-400">{col.label}</span>
              <span className="text-[8px] text-slate-600 ml-auto">{col.count}</span>
            </div>
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div
                key={i}
                className="rounded bg-white/[0.03] border border-white/[0.04] p-1.5 mb-1"
              >
                <div className="h-1 w-3/4 bg-white/[0.08] rounded-full" />
                <div className="h-1 w-1/2 bg-white/[0.05] rounded-full mt-1" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseMockup({ activeTab }: { activeTab: number }) {
  const tabs: Record<number, React.ReactNode> = {
    0: <MockDashboardView />,
    1: <MockJobsView />,
    2: <MockScheduleView />,
    3: <MockQuotesView />,
    4: <MockCrewView />,
  };
  return (
    <div className="aspect-[16/9] bg-[#0c1120] overflow-hidden select-none transition-all">
      {tabs[activeTab] || tabs[0]}
    </div>
  );
}

function MockDashboardView() {
  return (
    <div className="flex h-full text-[10px] sm:text-xs">
      {/* Sidebar */}
      <div className="w-10 sm:w-12 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
          <Layers className="w-2.5 h-2.5 text-white" />
        </div>
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-orange-500/15' : ''}`}
          >
            <Icon className={`w-3 h-3 ${i === 0 ? 'text-orange-400' : 'text-slate-600'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <p className="text-white font-bold text-xs sm:text-sm font-[Barlow] mb-2">Dashboard</p>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {['12 Active', '5 Pending', '$48.2K MTD', '97% On-Time'].map((s) => (
            <div
              key={s}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-1.5 text-center"
            >
              <p className="text-white font-bold text-[10px] sm:text-xs font-[Barlow]">
                {s.split(' ')[0]}
              </p>
              <p className="text-slate-500 text-[7px] sm:text-[8px]">
                {s.split(' ').slice(1).join(' ')}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2 h-[calc(100%-80px)]">
          <p className="text-[9px] text-slate-400 font-medium mb-2">Revenue Overview</p>
          <div className="flex items-end gap-1 h-[60%]">
            {[40, 65, 55, 80, 70, 90, 45, 75, 85, 60, 95, 50].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className={`w-full rounded-sm ${i === 9 ? 'bg-orange-500' : 'bg-orange-500/20'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[6px] text-slate-600">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockJobsView() {
  return (
    <div className="flex h-full text-[10px] sm:text-xs">
      <div className="w-10 sm:w-12 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
          <Layers className="w-2.5 h-2.5 text-white" />
        </div>
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-orange-500/15' : ''}`}
          >
            <Icon className={`w-3 h-3 ${i === 1 ? 'text-orange-400' : 'text-slate-600'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold text-xs sm:text-sm font-[Barlow]">Jobs</p>
          <div className="flex gap-1">
            {['All', 'Active', 'Completed'].map((f, i) => (
              <span
                key={f}
                className={`text-[8px] px-2 py-0.5 rounded ${i === 0 ? 'bg-orange-500 text-white' : 'bg-white/[0.04] text-slate-500'}`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        {/* Table */}
        <div className="rounded-md border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-6 gap-1 px-2 py-1.5 bg-white/[0.02] border-b border-white/[0.06]">
            {['Job #', 'Client', 'Status', 'Crew', 'Due', 'Value'].map((h) => (
              <p key={h} className="text-[7px] sm:text-[8px] text-slate-500 font-medium">
                {h}
              </p>
            ))}
          </div>
          {MOCK_JOBS.map((job, i) => (
            <div
              key={job.id}
              className={`grid grid-cols-6 gap-1 px-2 py-1.5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''} border-b border-white/[0.03]`}
            >
              <p className="text-[8px] text-orange-400 font-medium">{job.id}</p>
              <p className="text-[8px] text-white truncate">{job.client}</p>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${job.color}`} />
                <p className="text-[7px] text-slate-400 truncate">{job.status}</p>
              </div>
              <p className="text-[8px] text-slate-400">{job.crew}</p>
              <p className="text-[8px] text-slate-400">Feb {20 + i}</p>
              <p className="text-[8px] text-white font-medium">{job.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockScheduleView() {
  const days = ['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28'];
  const blocks = [
    {
      day: 0,
      start: 1,
      len: 3,
      label: 'Mitchell Res.',
      crew: 'Alpha',
      color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    },
    {
      day: 1,
      start: 0,
      len: 4,
      label: 'Metro Tower',
      crew: 'Bravo',
      color: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
    },
    {
      day: 2,
      start: 2,
      len: 2,
      label: 'Henderson',
      crew: 'Solo',
      color: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
    },
    {
      day: 3,
      start: 0,
      len: 5,
      label: 'Brisbane CBD',
      crew: 'Charlie',
      color: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
    },
    {
      day: 4,
      start: 1,
      len: 3,
      label: 'Park Ridge',
      crew: 'Alpha',
      color: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
    },
    {
      day: 0,
      start: 5,
      len: 2,
      label: 'Coastal Reno',
      crew: 'Bravo',
      color: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
    },
    {
      day: 2,
      start: 5,
      len: 2,
      label: 'Sunnybank',
      crew: 'Alpha',
      color: 'bg-rose-500/20 border-rose-500/30 text-rose-300',
    },
  ];

  return (
    <div className="flex h-full text-[10px] sm:text-xs">
      <div className="w-10 sm:w-12 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
          <Layers className="w-2.5 h-2.5 text-white" />
        </div>
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 2 ? 'bg-orange-500/15' : ''}`}
          >
            <Icon className={`w-3 h-3 ${i === 2 ? 'text-orange-400' : 'text-slate-600'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold text-xs sm:text-sm font-[Barlow]">
            Schedule — Week of Feb 24
          </p>
          <div className="flex gap-1 items-center">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
              ‹
            </span>
            <span className="text-[8px] px-2 py-0.5 rounded bg-orange-500/15 text-orange-400">
              This Week
            </span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
              ›
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1 h-[calc(100%-32px)]">
          {days.map((day, di) => (
            <div key={day} className="flex flex-col">
              <p className="text-[8px] text-slate-400 font-medium text-center mb-1 pb-1 border-b border-white/[0.06]">
                {day}
              </p>
              <div className="flex-1 relative">
                {/* Time slots background */}
                {Array.from({ length: 8 }).map((_, si) => (
                  <div
                    key={si}
                    className="border-b border-white/[0.02]"
                    style={{ height: '12.5%' }}
                  />
                ))}
                {/* Job blocks */}
                {blocks
                  .filter((b) => b.day === di)
                  .map((b, bi) => (
                    <div
                      key={bi}
                      className={`absolute left-0 right-0 mx-0.5 rounded border ${b.color} p-1 overflow-hidden`}
                      style={{ top: `${(b.start / 8) * 100}%`, height: `${(b.len / 8) * 100}%` }}
                    >
                      <p className="text-[7px] sm:text-[8px] font-medium truncate">{b.label}</p>
                      <p className="text-[6px] sm:text-[7px] opacity-70">{b.crew}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockQuotesView() {
  const quotes = [
    {
      id: 'Q-312',
      client: 'Mitchell Residence',
      items: 4,
      total: '$8,750',
      status: 'Sent',
      date: 'Feb 18',
    },
    {
      id: 'Q-313',
      client: 'Metro Tower Level 3',
      items: 12,
      total: '$24,200',
      status: 'Draft',
      date: 'Feb 19',
    },
    {
      id: 'Q-314',
      client: 'Coastal Renovation',
      items: 6,
      total: '$12,400',
      status: 'Accepted',
      date: 'Feb 15',
    },
    {
      id: 'Q-315',
      client: 'Henderson Kitchen',
      items: 3,
      total: '$3,900',
      status: 'Sent',
      date: 'Feb 20',
    },
    {
      id: 'Q-316',
      client: 'Park Ridge Fitout',
      items: 8,
      total: '$15,800',
      status: 'Accepted',
      date: 'Feb 12',
    },
  ];
  const statusColor: Record<string, string> = {
    Draft: 'bg-slate-500/20 text-slate-400',
    Sent: 'bg-amber-500/20 text-amber-400',
    Accepted: 'bg-emerald-500/20 text-emerald-400',
  };

  return (
    <div className="flex h-full text-[10px] sm:text-xs">
      <div className="w-10 sm:w-12 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
          <Layers className="w-2.5 h-2.5 text-white" />
        </div>
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 3 ? 'bg-orange-500/15' : ''}`}
          >
            <Icon className={`w-3 h-3 ${i === 3 ? 'text-orange-400' : 'text-slate-600'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold text-xs sm:text-sm font-[Barlow]">Quotes</p>
          <span className="text-[8px] px-2 py-1 rounded bg-orange-500 text-white font-medium">
            + New Quote
          </span>
        </div>
        <div className="rounded-md border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-6 gap-1 px-2 py-1.5 bg-white/[0.02] border-b border-white/[0.06]">
            {['Quote #', 'Client', 'Items', 'Total', 'Status', 'Date'].map((h) => (
              <p key={h} className="text-[7px] sm:text-[8px] text-slate-500 font-medium">
                {h}
              </p>
            ))}
          </div>
          {quotes.map((q, i) => (
            <div
              key={q.id}
              className={`grid grid-cols-6 gap-1 px-2 py-1.5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''} border-b border-white/[0.03]`}
            >
              <p className="text-[8px] text-orange-400 font-medium">{q.id}</p>
              <p className="text-[8px] text-white truncate">{q.client}</p>
              <p className="text-[8px] text-slate-400">{q.items} items</p>
              <p className="text-[8px] text-white font-medium">{q.total}</p>
              <span
                className={`text-[7px] px-1.5 py-0.5 rounded-full ${statusColor[q.status]} w-fit`}
              >
                {q.status}
              </span>
              <p className="text-[8px] text-slate-400">{q.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockCrewView() {
  const crew = [
    {
      name: 'Team Alpha',
      members: 'Jake, Tom, Liam',
      jobs: 3,
      status: 'On Site',
      location: 'Paddington QLD',
    },
    {
      name: 'Team Bravo',
      members: 'Sarah, Ben',
      jobs: 2,
      status: 'In Transit',
      location: 'Bulimba QLD',
    },
    {
      name: 'Team Charlie',
      members: 'Marcus, Dave, Chris',
      jobs: 1,
      status: 'On Site',
      location: 'CBD Brisbane',
    },
    {
      name: 'Solo — Pete',
      members: 'Pete H.',
      jobs: 1,
      status: 'Completed',
      location: 'Coorparoo QLD',
    },
  ];

  return (
    <div className="flex h-full text-[10px] sm:text-xs">
      <div className="w-10 sm:w-12 bg-[#080d19] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-2">
          <Layers className="w-2.5 h-2.5 text-white" />
        </div>
        {[LayoutDashboard, ClipboardList, CalendarDays, FileText, Users].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 4 ? 'bg-orange-500/15' : ''}`}
          >
            <Icon className={`w-3 h-3 ${i === 4 ? 'text-orange-400' : 'text-slate-600'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white font-bold text-xs sm:text-sm font-[Barlow]">Crew</p>
          <div className="flex gap-1 items-center">
            <span className="text-[8px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 rounded">
              3 On Site
            </span>
            <span className="text-[8px] px-2 py-0.5 bg-blue-500/15 text-blue-400 rounded">
              1 Transit
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {crew.map((c) => (
            <div key={c.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] sm:text-[10px] text-white font-semibold">{c.name}</p>
                <span
                  className={`text-[7px] px-1.5 py-0.5 rounded-full ${
                    c.status === 'On Site'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : c.status === 'In Transit'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-violet-500/20 text-violet-400'
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-[7px] sm:text-[8px] text-slate-500">{c.members}</p>
              <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/[0.04]">
                <p className="text-[7px] text-slate-400">
                  {c.jobs} active job{c.jobs > 1 ? 's' : ''}
                </p>
                <p className="text-[7px] text-orange-400">{c.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── sections ─────────────────────────── */

const APP_URL = 'https://rprime-v2-production.up.railway.app';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050810]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <img src="/rprime-header-logo.png" alt="RPrime" className="h-16 w-auto object-contain" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm text-slate-400 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => (window.location.href = `${APP_URL}/auth`)}
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Log in
          </button>
          <button
            onClick={() => (window.location.href = `${APP_URL}/signup`)}
            className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5"
          >
            Start Free Trial
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/[0.06]`}
      >
        <div className="px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="block w-full text-left text-sm text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              {link}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                window.location.href = `${APP_URL}/auth`;
              }}
              className="text-sm text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                window.location.href = `${APP_URL}/signup`;
              }}
              className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-3 rounded-lg text-center"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/[0.07] blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px] animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-[150px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '4s' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-medium text-orange-300 tracking-wide">
                #1 Job Management Platform for Tradies
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-[Barlow]">
              <span className="text-white">Less admin.</span>
              <br />
              <span className="text-white">More jobs.</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Get paid faster.
              </span>
            </h1>
          </Reveal>

          {/* Subline */}
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg text-slate-400 mt-6 leading-relaxed max-w-xl mx-auto">
              The all-in-one platform Australian trade businesses use to manage jobs, quotes,
              scheduling, invoicing, and crew — from enquiry to invoice.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
              <button
                onClick={() => (window.location.href = `${APP_URL}/signup`)}
                className="w-full sm:w-auto text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-3.5 rounded-xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full sm:w-auto text-sm font-semibold text-slate-300 hover:text-white px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all"
              >
                See How It Works
              </button>
            </div>
          </Reveal>

          {/* Trust line */}
          <Reveal delay={0.4}>
            <p className="text-xs text-slate-500 mt-5">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </Reveal>
        </div>

        {/* Hero screenshot placeholder */}
        <Reveal delay={0.5}>
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f1a] shadow-2xl shadow-black/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0a0f1a]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded-md px-4 py-1 text-xs text-slate-500">
                    <Globe className="w-3 h-3" />
                    app.rprime.com.au
                  </div>
                </div>
              </div>
              {/* Dashboard mockup */}
              <DashboardMockup />
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent rounded-xl pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Stats strip ── */
function StatsSection() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <Reveal>
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-widest font-medium">
            Trusted by trade businesses across Australia
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <StatBlock stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBlock({ stat }: { stat: (typeof STATS)[number] }) {
  const { ref, count } = useCountUp(stat.isDecimal ? Math.round(stat.value * 10) : stat.value);
  const display = stat.isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="text-3xl sm:text-4xl font-extrabold text-white font-[Barlow] tabular-nums"
      >
        {display}
        {stat.suffix}
      </span>
      <p className="text-sm text-slate-500 mt-1.5">{stat.label}</p>
    </div>
  );
}

/* ── Features bento grid ── */
function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight leading-tight">
              Everything you need to run your trade business
            </h2>
            <p className="text-base text-slate-400 mt-4 max-w-lg mx-auto">
              From first enquiry to final invoice. One platform, zero paperwork.
            </p>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            const isLarge = feat.size === 'large';
            const isMedium = feat.size === 'medium';
            return (
              <Reveal
                key={feat.title}
                delay={i * 0.08}
                className={
                  isLarge ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : isMedium ? '' : ''
                }
              >
                <div
                  className={`group relative rounded-2xl border border-white/[0.06] bg-[#0a0f1a] hover:bg-[#0e1424] hover:border-white/[0.1] transition-all duration-300 overflow-hidden h-full ${
                    isLarge ? 'p-8 sm:p-10' : 'p-6 sm:p-8'
                  }`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/15 transition-colors">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-[Barlow]">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>

                    {isLarge && <MiniPipelineMockup />}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Product Showcase ── */
function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const TABS = ['Dashboard', 'Jobs', 'Schedule', 'Quotes', 'Crew'];

  return (
    <section className="relative py-20 sm:py-28 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Product
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight">
              See RPrime in action
            </h2>
            <p className="text-base text-slate-400 mt-4">
              Built by tradies, for tradies. Every screen designed to save you time.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-8 bg-[#0a0f1a] rounded-xl p-1.5 max-w-lg mx-auto border border-white/[0.06]">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  activeTab === i
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f1a] shadow-2xl shadow-black/50">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-white/[0.04] rounded-md px-4 py-1 text-xs text-slate-500">
                    <Globe className="w-3 h-3" />
                    app.rprime.com.au/{TABS[activeTab].toLowerCase()}
                  </div>
                </div>
              </div>
              {/* App mockup */}
              <ShowcaseMockup activeTab={activeTab} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Industries ── */
function IndustriesSection() {
  return (
    <section id="industries" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Industries
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight">
              Built for every trade
            </h2>
            <p className="text-base text-slate-400 mt-4">
              Whether you are a one-person operation or a team of 50, RPrime adapts to how you work.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.name} delay={i * 0.06}>
                <div className="group rounded-2xl border border-white/[0.06] bg-[#0a0f1a] p-5 sm:p-6 hover:bg-[#0e1424] hover:border-orange-500/20 transition-all duration-300 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500/15 group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 font-[Barlow]">{ind.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{ind.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ── */
function HowItWorksSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight">
              From enquiry to invoice in 3 steps
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-[39px] sm:left-1/2 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/20 to-transparent hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={i * 0.15}>
                  <div
                    className={`flex items-start gap-6 sm:gap-12 ${
                      i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                    }`}
                  >
                    {/* Number */}
                    <div className="shrink-0 relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-orange-400" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-orange-500/30">
                        {step.num}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="pt-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-[Barlow] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight">
              Tradies love RPrime
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/[0.06] bg-[#0a0f1a] p-6 sm:p-8 hover:border-white/[0.1] transition-all h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Integrations ── */
function IntegrationsSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Integrations
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[Barlow]">
              Connects with tools you already use
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {INTEGRATIONS.map((int) => (
              <div
                key={int.name}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0a0f1a] px-6 py-4 hover:border-orange-500/20 hover:bg-[#0e1424] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                  <Zap className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{int.name}</p>
                  <p className="text-xs text-slate-500">{int.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Pricing ── */
function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight">
              Clear, simple pricing
            </h2>
            <p className="text-base text-slate-400 mt-4">
              No contracts. No hidden fees. Start free, upgrade when you are ready.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col h-full transition-all ${
                  tier.highlighted
                    ? 'border-orange-500/30 bg-gradient-to-b from-orange-500/[0.08] to-[#0a0f1a] shadow-xl shadow-orange-500/10'
                    : 'border-white/[0.06] bg-[#0a0f1a] hover:border-white/[0.1]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-orange-500/30">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white font-[Barlow]">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{tier.desc}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white font-[Barlow]">
                    ${tier.price}
                  </span>
                  <span className="text-sm text-slate-500 ml-1">/mo per user</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => (window.location.href = `${APP_URL}/signup`)}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5'
                      : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-[#070b14]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-orange-400 tracking-wide uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-[Barlow] tracking-tight">
              Got questions?
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-xl border border-white/[0.06] bg-[#0a0f1a] overflow-hidden hover:border-white/[0.1] transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[Barlow] tracking-tight leading-tight">
            Ready to get your
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              weekends back?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base text-slate-400 mt-5 max-w-md mx-auto">
            Join thousands of trade businesses running smarter with RPrime. Start your free trial
            today.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button
              onClick={() => (window.location.href = `${APP_URL}/signup`)}
              className="w-full sm:w-auto text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-10 py-4 rounded-xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => (window.location.href = `${APP_URL}/auth`)}
              className="text-sm text-slate-400 hover:text-white transition-colors px-6 py-4"
            >
              Already have an account? <span className="text-orange-400 font-semibold">Log in</span>
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-4">
            14-day free trial · No credit card · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-white/[0.06] bg-[#050810]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white font-[Barlow]">
                R<span className="text-orange-500">Prime</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Job management software built for Australian trade businesses.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Industries', 'FAQ'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link.toLowerCase())}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Company
            </p>
            <ul className="space-y-2">
              {['About', 'Contact', 'Privacy', 'Terms'].map((link) => (
                <li key={link}>
                  <span className="text-xs text-slate-500">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Get in touch
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-slate-500">hello@rprime.com.au</li>
              <li className="text-xs text-slate-500">Brisbane, QLD</li>
              <li className="text-xs text-slate-500">ABN: XX XXX XXX XXX</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} RPrime Pty Ltd. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Made with <span className="text-red-500">♥</span> in Brisbane, Australia 🇦🇺
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── main ─────────────────────────── */

export default function App() {
  useEffect(() => {
    document.title = 'RPrime — Job Management Software for Trade Businesses | Australia';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'RPrime is the all-in-one job management platform for Australian trade businesses. Manage jobs, quotes, invoices, crew scheduling and more — from enquiry to invoice.'
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ShowcaseSection />
      <IndustriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

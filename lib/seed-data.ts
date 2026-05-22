// Questions drawn from IBIG-04-02, 04-04, 04-05, 04-06, 04-07 guides

export const seedData = [
  // ═══════════════════════════════════════════════════
  // ACCOUNTING — IBIG-04-02 (Accounting & 3 Statements)
  // ═══════════════════════════════════════════════════
  {
    topic: "accounting", difficulty: "beginner", source: "guide_extracted",
    question: "Walk me through the three financial statements.",
    answer: "The Income Statement shows revenues, expenses, and net income over a period. Net income flows into the Cash Flow Statement and into Retained Earnings on the Balance Sheet.\n\nThe Cash Flow Statement starts with Net Income, adjusts for non-cash items (D&A, stock-based comp), working capital changes, investing activities (capex), and financing activities (debt/equity issuance). The ending cash balance flows to the Balance Sheet.\n\nThe Balance Sheet is a snapshot at a point in time: Assets = Liabilities + Equity. The change in cash from the CFS updates the Cash line on the BS; net income increases Retained Earnings. These three linkages keep the statements in balance.",
  },
  {
    topic: "accounting", difficulty: "beginner", source: "guide_extracted",
    question: "How do the three financial statements link together?",
    answer: "Three key linkages:\n\n1. Net Income → CFS and Balance Sheet. Net Income from the Income Statement is the starting line of the operating section of the Cash Flow Statement (indirect method). It also flows into Retained Earnings under Stockholders' Equity on the Balance Sheet.\n\n2. Cash → Balance Sheet. The ending cash balance from the bottom of the Cash Flow Statement becomes the Cash line on the Balance Sheet.\n\n3. Balance Sheet changes drive the CFS. Changes in working capital accounts (AR, inventory, AP, accrued liabilities) appear as adjustments in the operating section of the CFS. Capex shows up in investing activities and increases PP&E on the BS. Debt issuance/repayment shows in financing activities and changes debt balances on the BS.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "If Depreciation increases by $10, walk me through the impact on all three statements. Assume a 40% tax rate.",
    answer: "Income Statement: Depreciation ↑ $10 → Pre-tax income ↓ $10 → Taxes ↓ $4 (40%) → Net Income ↓ $6.\n\nCash Flow Statement: Start with Net Income ↓ $6. Add back Depreciation ↑ $10 (non-cash). Net change in cash: +$4 (the tax shield).\n\nBalance Sheet: Cash ↑ $4 (operating CF effect). PP&E (net) ↓ $10 (higher accumulated depreciation). Retained Earnings ↓ $6 (from lower net income). Check: Assets side: +4 − 10 = −6. Liabilities & Equity: −6 from RE. Balanced.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "A company raises $200 in debt and uses it to buy $200 of inventory. Walk me through the impact on all three statements.",
    answer: "Income Statement: No impact. No revenue was recognized, no expense was incurred.\n\nCash Flow Statement:\n• Financing Activities: +$200 (debt issuance)\n• Operating Activities: −$200 (inventory purchase increases current assets → cash outflow)\n• Net change in cash: $0\n\nBalance Sheet:\n• Cash: No change (200 in, 200 out)\n• Inventory: ↑ $200\n• Total Assets: ↑ $200\n• Long-term Debt: ↑ $200\n• Total Liabilities & Equity: ↑ $200. Balanced.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "Walk me through what happens on all three statements when a company purchases $100 of PP&E. Assume 40% tax rate.",
    answer: "Income Statement: No immediate impact. Capex is capitalized, not expensed. Only the subsequent depreciation hits the income statement.\n\nCash Flow Statement: −$100 in Investing Activities (capital expenditure).\n\nBalance Sheet: Cash ↓ $100. PP&E (gross) ↑ $100. Net change to assets: $0. No change to liabilities or equity.\n\nNote: In subsequent periods, as the PP&E is depreciated, you'll see: Depreciation expense on the Income Statement reduces Net Income (net of tax), and the CFS adds back the non-cash D&A, while PP&E (net) declines on the Balance Sheet.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "How do you record a $100 asset write-down on the three statements? Assume 40% tax rate.",
    answer: "Income Statement: Write-down hits as an impairment charge (often in COGS or a separate line). Pre-tax income ↓ $100 → Tax benefit ↑ $40 → Net Income ↓ $60.\n\nCash Flow Statement: Net Income ↓ $60. Add back non-cash write-down: +$100. Net cash effect: +$40 (tax benefit only — no actual cash leaves the company).\n\nBalance Sheet: The asset (e.g., PP&E or goodwill) ↓ $100. Deferred tax asset (or taxes payable) ↑ $40. Retained Earnings ↓ $60. Assets: −100 + 40 = −60. Equity: −60. Balanced.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "What is goodwill? When is it created and how is it treated on the financial statements?",
    answer: "Goodwill is created in an acquisition when the purchase price exceeds the fair value of the target's net identifiable assets (tangible assets + identifiable intangibles − liabilities).\n\nFormula: Goodwill = Purchase Price − Fair Value of Net Identifiable Assets.\n\nBalance Sheet: Sits as a long-term intangible asset.\n\nIncome Statement: Under US GAAP, goodwill is NOT amortized. Instead, it's tested for impairment annually. If impaired, the write-down hits as a non-cash charge on the IS, reducing net income but not affecting cash.\n\nUnder IFRS: Same — goodwill is not amortized, tested for impairment. (Exception: IFRS 3 amendment allows private companies to amortize goodwill over useful life up to 10 years.)",
  },
  {
    topic: "accounting", difficulty: "beginner", source: "guide_extracted",
    question: "What is the difference between cash-based and accrual accounting? Which do public companies use?",
    answer: "Cash accounting: Revenue and expenses recorded when cash actually changes hands. Simple, but distorts financial performance.\n\nAccrual accounting: Revenue recorded when earned (not when cash is received); expenses recorded when incurred (not when paid). Required under GAAP and IFRS for public companies.\n\nExample: A company signs a $1,200 annual subscription in January and receives cash upfront.\n• Cash accounting: $1,200 revenue in January.\n• Accrual: $100 revenue per month; the remaining unearned portion is Deferred Revenue (a liability).\n\nThe Cash Flow Statement exists largely to reconcile accrual net income back to actual cash generated.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "What is deferred revenue and why is it classified as a liability?",
    answer: "Deferred revenue (unearned revenue) is cash received for goods or services not yet delivered. It's a liability because the company still owes performance — if it fails to deliver, it must return the money.\n\nExample: Software company receives $12,000 annual subscription in January:\n• DR Cash $12,000 / CR Deferred Revenue $12,000\n• Each month: DR Deferred Revenue $1,000 / CR Revenue $1,000\n\nFinancial statement impact: Deferred revenue creates a difference between cash received and revenue recognized. Growing SaaS companies can generate strong operating cash flows even when showing low net income, partly because deferred revenue is building.\n\nIn M&A: Deferred revenue is often written down (haircut) in purchase price allocation, reducing the acquirer's future revenue.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "What is the difference between accounts receivable and deferred revenue, and how does each affect cash flow?",
    answer: "Accounts Receivable: Revenue has been recognized (earned) but cash hasn't been collected yet. An increase in AR is a cash outflow on the CFS (the company 'fronted' the revenue before collecting).\n\nDeferred Revenue: Cash has been received but revenue hasn't been recognized yet. An increase in Deferred Revenue is a cash inflow on the CFS (the company collected cash before earning it).\n\nMnemonic: AR is 'we earned it but haven't collected.' Deferred Revenue is 'we collected but haven't earned it.'\n\nBoth illustrate timing differences between cash flows and accrual income — the core reason the Cash Flow Statement exists.",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "What are deferred tax assets and deferred tax liabilities? Give an example of each.",
    answer: "Deferred Tax Asset (DTA): Created when a company has paid more taxes than its book income would imply, or expects future tax deductions. Represents future tax savings.\n\nExample: Accelerated depreciation for tax purposes. If a machine is depreciated faster on the tax return than on the books, the company pays lower taxes now — creating a DTL. OR: a loss carryforward creates a DTA (future tax savings from offsetting income).\n\nDeferred Tax Liability (DTL): Created when taxable income is less than book income, meaning taxes are owed in the future.\n\nExample: Revenue recognized on the books before it's taxable. Or accelerated tax depreciation: depreciation is higher on the tax return, so taxable income < book income now → DTL for taxes deferred to later.\n\nBalance sheet treatment: DTAs are assets (future benefit); DTLs are liabilities (future obligation).",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "Walk me through what happens when a company issues $100 of stock-based compensation. Assume 40% tax rate.",
    answer: "Income Statement: SBC is recorded as an expense (in COGS or SG&A). Pre-tax income ↓ $100 → Taxes ↓ $40 → Net Income ↓ $60.\n\nCash Flow Statement: Net Income ↓ $60. Add back non-cash SBC: +$100. Tax benefit of SBC (shown in financing or operating, depending on GAAP version): the actual cash tax benefit. Net operating CF: +$40.\n\nBalance Sheet: Stockholders' Equity ↑ $40 net (Additional Paid-In Capital ↑ $100 from the SBC award, Retained Earnings ↓ $60 from lower net income).\n\nKey nuance: SBC dilutes existing shareholders (new shares are eventually issued) but has no cash cost. Analysts sometimes add back SBC to get 'cash earnings,' though this ignores the real dilution cost.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "What is working capital? Which changes are good and which are bad from a cash perspective?",
    answer: "Working Capital = Current Assets − Current Liabilities.\n\nNet Working Capital (NWC) for cash flow purposes usually = (AR + Inventory + Prepaid Expenses) − (AP + Accrued Liabilities + Deferred Revenue).\n\nCash flow impact:\n• AR ↑ = cash outflow (sold goods but didn't collect yet)\n• Inventory ↑ = cash outflow (bought goods but didn't sell)\n• AP ↑ = cash inflow (received goods but haven't paid yet)\n• Accrued liabilities ↑ = cash inflow (incurred expenses but haven't paid)\n• Deferred Revenue ↑ = cash inflow (collected cash but haven't earned yet)\n\nRule of thumb: ↑ in current asset = cash outflow; ↑ in current liability = cash inflow.\n\nHigh-growth companies often have FCF below net income because working capital grows with revenue.",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "How does LIFO vs. FIFO affect the Income Statement and Balance Sheet in a rising price environment?",
    answer: "FIFO (First In, First Out) — oldest inventory sold first:\n• COGS = lower (older, cheaper costs)\n• Gross Profit = higher\n• Net Income = higher\n• Taxes = higher\n• Ending Inventory on BS = higher (reflects newer, higher-cost units)\n\nLIFO (Last In, First Out) — newest inventory sold first:\n• COGS = higher (newer, more expensive costs)\n• Gross Profit = lower\n• Net Income = lower\n• Taxes = lower (tax shield)\n• Ending Inventory on BS = lower (reflects older, cheaper units — understates current value)\n\nLIFO is permitted only under US GAAP (not IFRS). Companies use it for the tax benefit in inflationary environments.\n\nLIFO Reserve = FIFO Inventory − LIFO Inventory. Analysts add it back to normalize inventory comparisons between LIFO and FIFO companies.",
  },
  {
    topic: "accounting", difficulty: "beginner", source: "guide_extracted",
    question: "Why might two companies in the same industry have very different EBITDA margins but similar Free Cash Flow margins?",
    answer: "EBITDA margin differences can be driven by:\n• Different D&A policies (more/less capital-intensive, different useful life assumptions)\n• Different SBC levels (excluded from EBITDA)\n• One-time charges or restructuring costs\n\nYet FCF margins might converge because:\n• The company with higher D&A likely has higher capex (which reduces FCF directly)\n• FCF = Net Income + D&A − Capex − ΔWC, so high D&A paired with high capex roughly nets out\n• Tax differences may offset income statement variances\n\nThis is why EBITDA alone can be misleading for capital-intensive businesses. EV/(EBITDA − Capex) or EV/FCF may be more meaningful multiples when comparing companies with very different capital intensity.",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "What is the difference between operating and capital leases, and how are they treated on the financial statements?",
    answer: "Under ASC 842 / IFRS 16 (post-2019), nearly all leases are on-balance sheet:\n\nFinance (Capital) Lease: Treated like purchased asset. Asset recognized on BS; liability for PV of payments. Income statement shows depreciation + interest expense (front-loaded cost). CFS: principal payments in financing, interest in operating.\n\nOperating Lease: Also on-balance sheet now (right-of-use asset + lease liability). Income statement: single straight-line lease expense in operating expenses. CFS: all payments in operating activities.\n\nEV impact: Operating lease liabilities are now widely included in EV bridge as debt-like items, similar to how financial leases were always treated.\n\nKey: Under the old rules (pre-2019), operating leases were off-balance sheet. Companies (especially retailers/airlines) appeared less levered than they truly were.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "A company records $100 of revenue but only collects $80 in cash. What are the journal entries and how does this flow through the three statements?",
    answer: "Journal entry: DR Accounts Receivable $100 / CR Revenue $100. Then separately: DR Cash $80 / CR Accounts Receivable $80.\n\nNet effect: AR ↑ $20, Cash ↑ $80.\n\nIncome Statement: Revenue ↑ $100 (full amount recognized under accrual accounting).\n\nCash Flow Statement (indirect method): Net income includes the full $100. Then subtract the AR increase: −$20 (working capital use). Net operating CF from this transaction: +$80.\n\nBalance Sheet: Cash ↑ $80, AR ↑ $20, total assets ↑ $100. Retained Earnings ↑ $100 (pre-tax; net of tax in practice). This illustrates why revenue ≠ cash and why the CFS reconciliation matters.",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "If a company has $100 of net income, how might its cash from operations differ, and what are the main adjustments?",
    answer: "Cash from Operations ≠ Net Income because of non-cash items and working capital changes.\n\nCommon positive adjustments (add back):\n• Depreciation & Amortization (non-cash expense)\n• Stock-Based Compensation (non-cash)\n• Deferred taxes (timing difference)\n• Impairments / write-downs\n• Increase in accounts payable or accrued liabilities\n• Increase in deferred revenue\n\nCommon negative adjustments (subtract):\n• Increase in accounts receivable (earned but not collected)\n• Increase in inventory (cash spent on goods not yet sold)\n• Decrease in accounts payable (paying off bills)\n\nResult: A capital-intensive business with high D&A could have CFO >> net income. A fast-growing business building AR and inventory could have CFO << net income. This is why the CFS is critical — earnings can be manipulated more easily than cash.",
  },
  {
    topic: "accounting", difficulty: "beginner", source: "guide_extracted",
    question: "What is EBITDA and what are its limitations?",
    answer: "EBITDA = Earnings Before Interest, Taxes, Depreciation & Amortization.\nCalculation: EBIT + D&A, or Net Income + Interest + Taxes + D&A.\n\nWhy analysts use it:\n• Capital structure neutral (strips out interest → compare levered/unlevered companies)\n• Removes non-cash D&A (varies by accounting method)\n• Tax-jurisdiction neutral\n• Proxy for operating cash generation\n\nLimitations:\n• Ignores capital expenditure requirements — a business spending 90% of EBITDA on capex is not cash-generative\n• Ignores working capital needs\n• Ignores taxes (real cash cost)\n• Can be manipulated via aggressive capitalization policies\n• Charlie Munger: 'Every time you hear EBITDA, substitute the phrase bullsh** earnings'\n\nBetter metrics for capital-intensive businesses: EBITDA − Capex, Free Cash Flow, EBIT.",
  },
  {
    topic: "accounting", difficulty: "advanced", source: "guide_extracted",
    question: "A company pays $100 cash dividend to shareholders. Walk me through the impact on all three statements.",
    answer: "Income Statement: No impact. Dividends are not an expense — they're a distribution of earnings, not a cost of generating them.\n\nCash Flow Statement: −$100 in Financing Activities (cash paid to equity holders).\n\nBalance Sheet: Cash ↓ $100 (asset). Retained Earnings ↓ $100 (equity — dividends reduce accumulated retained earnings). Net effect: Assets ↓ $100, Equity ↓ $100. Balanced.\n\nKey distinction: A dividend is not tax-deductible (unlike interest). It comes out of after-tax earnings. This is the 'double taxation' of dividends — corporate income is taxed at the entity level, then shareholders pay personal income tax on the dividend received.",
  },
  {
    topic: "accounting", difficulty: "intermediate", source: "guide_extracted",
    question: "What is the difference between gross PP&E and net PP&E, and how do you interpret each?",
    answer: "Gross PP&E: The original historical cost of all property, plant, and equipment before any depreciation. Represents total capital invested in fixed assets since inception.\n\nAccumulated Depreciation: The total depreciation charged against gross PP&E over time. Reduces the book value but is not an actual cash reserve.\n\nNet PP&E = Gross PP&E − Accumulated Depreciation. The 'book value' of assets as recorded on the balance sheet.\n\nInterpretation: If Accumulated Depreciation / Gross PP&E is very high (e.g., 80%), the asset base is largely depreciated — the company may need significant capex soon to replace aging assets. If low, assets are relatively new.\n\nNote: Net PP&E is a book value concept and rarely equals market value or replacement cost of the assets.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // EQUITY / ENTERPRISE VALUE — IBIG-04-04 (EV, Metrics & Multiples)
  // ═══════════════════════════════════════════════════════════════════
  {
    topic: "equity_ev", difficulty: "beginner", source: "guide_extracted",
    question: "What is the difference between equity value and enterprise value?",
    answer: "Equity Value (Market Capitalization) = Share Price × Diluted Shares Outstanding. It represents the value attributable to equity shareholders only — what equity holders own after all obligations are satisfied.\n\nEnterprise Value = Equity Value + Net Debt + Preferred Stock + Minority Interest. It represents the total value of the entire business, regardless of capital structure — what you'd pay to acquire 100% of the company free and clear.\n\nAnalogy: House worth $500K with a $300K mortgage. Equity value = $200K (your equity). Enterprise value = $500K (full property value). A buyer acquiring the house assumes the mortgage and pays for the equity — total cost = $500K.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "Why do we add debt and subtract cash when calculating enterprise value from equity value?",
    answer: "We add debt because a buyer who acquires 100% of a company's equity also assumes its debt obligations. A company with $200M of equity value and $100M of debt costs $300M to acquire in total — the buyer pays $200M for the equity and must repay $100M of debt.\n\nWe subtract cash because cash is an asset the buyer receives upon acquisition. If a company has $200M equity value and $50M cash, the net cost for the underlying business is only $150M — the buyer effectively gets the $50M cash back immediately.\n\nThis is why EV is capital-structure neutral: two identical operating businesses — one all-equity, one with $100M debt — should have the same EV (reflecting the same operating value) even though their equity values differ by $100M.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "What items bridge equity value to enterprise value? List all the components.",
    answer: "EV = Equity Value + [Debt-like items] − [Cash-like items]\n\nDebt-like items (ADD):\n• Short-term debt and current portion of long-term debt\n• Long-term debt (bonds, term loans, revolving credit)\n• Capital lease obligations / finance lease liabilities\n• Operating lease liabilities (post-ASC 842)\n• Preferred stock (fixed obligations, liquidation preference)\n• Minority interest / noncontrolling interest\n• Unfunded pension obligations (sometimes)\n• Contingent consideration in M&A contexts (sometimes)\n\nCash-like items (SUBTRACT):\n• Cash and cash equivalents\n• Short-term investments / marketable securities\n• Sometimes: long-term investments in public securities\n\nNet Debt = Total Debt + Preferred + Minority Interest − Cash. EV = Equity Value + Net Debt.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "Why is minority interest included in enterprise value?",
    answer: "Minority interest (noncontrolling interest, NCI) represents the portion of a consolidated subsidiary not owned by the parent company.\n\nWhen a parent owns >50% of a subsidiary, it consolidates 100% of the subsidiary's revenues, EBITDA, and assets onto its own financial statements — even the 30% or 40% not owned by the parent.\n\nThis creates a consistency problem: EV multiples use 100% of EBITDA in the numerator, so the denominator (EV) must also reflect 100% of the business. But the parent's equity value only represents the parent's ownership stake, not the portion belonging to minority shareholders.\n\nSolution: Add minority interest to EV to capture the full 100% of the consolidated business. Failing to do this would understate EV relative to EBITDA, making the company look cheaper than it is.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "How do you calculate diluted shares outstanding using the treasury stock method?",
    answer: "The Treasury Stock Method (TSM) calculates net new shares from in-the-money options and warrants.\n\nLogic: When employees exercise options, the company receives the strike price proceeds. The company is assumed to use those proceeds to repurchase shares at the current market price. Only the net new shares (exercised minus repurchased) increase the share count.\n\nFormula:\nNet new shares = Options (in-the-money) − (Strike Price × Options ÷ Current Share Price)\n\nExample: 10M options at $10 strike, stock at $30:\n• Proceeds = 10M × $10 = $100M\n• Shares repurchased = $100M ÷ $30 = 3.33M\n• Net new shares = 10M − 3.33M = 6.67M\n• Add 6.67M to basic shares for diluted count\n\nOnly include options where strike price < current share price (in-the-money). Out-of-the-money options are excluded as they're anti-dilutive.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "How do you calculate diluted shares when a company has convertible bonds? What is the if-converted method?",
    answer: "For convertible bonds, use the if-converted method:\n\nStep 1: Assume all convertible bonds are converted to equity at their conversion price.\nStep 2: Calculate new shares issued: Bond Face Value ÷ Conversion Price.\nStep 3: Add those new shares to diluted share count.\nStep 4: Add back the after-tax interest expense on the converted bonds to net income (since bondholders become equity holders and interest is no longer paid).\n\nExample: $100M convertible bond at 5% interest, $20 conversion price, 40% tax rate:\n• New shares = $100M ÷ $20 = 5M shares\n• After-tax interest add-back = $100M × 5% × (1 − 40%) = $3M\n• Diluted EPS denominator ↑ 5M shares; numerator ↑ $3M\n\nOnly include the conversion if it's dilutive (i.e., increases share count without proportionally increasing earnings per share).",
  },
  {
    topic: "equity_ev", difficulty: "beginner", source: "guide_extracted",
    question: "When should you use equity value multiples (like P/E) versus enterprise value multiples (like EV/EBITDA)?",
    answer: "EV multiples (EV/EBITDA, EV/EBIT, EV/Revenue) are preferred when:\n• Comparing companies with different capital structures (leverage levels)\n• The metric in the denominator is available to all capital providers\n• Doing M&A or LBO analysis where you're buying the whole business\n• The company may have negative earnings (EV/Revenue, EV/EBITDA still work)\n\nEquity multiples (P/E, P/Book, P/FCF) are appropriate when:\n• Capital structure is consistent across comparables (same leverage)\n• Valuing financial companies (banks, insurance) where interest is core to operations — EV doesn't make sense for banks\n• The metric in the denominator is specific to equity holders (e.g., EPS)\n• Quick public market comparisons where investors think in P/E terms\n\nRule: Match the numerator to the denominator — EV metrics to pre-financing metrics, equity metrics to post-financing, post-tax metrics.",
  },
  {
    topic: "equity_ev", difficulty: "advanced", source: "guide_extracted",
    question: "Can enterprise value ever be negative? What would that imply?",
    answer: "Yes. EV = Equity Value + Net Debt. If Net Debt is very negative (i.e., the company holds far more cash than debt), and that net cash exceeds the equity value, EV turns negative.\n\nExample: Company with $200M equity value, $0 debt, $300M cash → Net Debt = −$300M → EV = −$100M.\n\nWhat it implies:\n1. The market is pricing the operating business at negative value — meaning it costs more to run than it's worth (cash-burning business with uncertain future)\n2. OR the stock is dramatically undervalued relative to its balance sheet (potential value trap or activist opportunity)\n\nIn practice, negative EV is rare but occurs in:\n• Distressed companies burning cash rapidly\n• Companies with massive overseas cash trapped by tax considerations (old Apple pre-tax reform)\n• Deep value / net-net situations (stocks trading below net cash)\n\nAlways investigate — it either signals severe distress or a potential opportunity.",
  },
  {
    topic: "equity_ev", difficulty: "intermediate", source: "guide_extracted",
    question: "How do operating leases affect enterprise value and EBITDA under current accounting rules?",
    answer: "Under ASC 842 (US GAAP) and IFRS 16, effective 2019, operating leases are now on the balance sheet:\n• Right-of-use (ROU) asset recorded\n• Operating lease liability recorded\n\nImpact on EV: Lease liabilities are now widely included in the EV bridge as debt-like items, just like financial leases. This increased stated EV for companies with significant operating leases (retailers, airlines, restaurants).\n\nImpact on EBITDA: Under ASC 842, the single straight-line lease expense remains in operating expenses — EBITDA does NOT exclude it. EBITDA is therefore not affected by the BS reclassification.\n\nAnalyst adjustments: Some analysts use 'EBITDAR' (add back Rent) to compare companies pre-lease standard. Post-ASC 842, EBITDA already implicitly includes rent in operating expenses, so comparisons across periods require care.\n\nKey implication: Companies look more levered now, and EV is higher. This doesn't change the fundamental business value — it's an accounting reclassification.",
  },
  {
    topic: "equity_ev", difficulty: "advanced", source: "guide_extracted",
    question: "Walk me through how you'd calculate the fully diluted equity value of a company with options, warrants, and convertible bonds.",
    answer: "Step 1: Start with basic shares outstanding (from the cover page of any SEC filing).\n\nStep 2: Add dilutive securities using Treasury Stock Method for options and warrants:\n• For each tranche: Net new shares = Options − (Strike × Options ÷ Stock Price)\n• Sum net new shares across all in-the-money tranches\n\nStep 3: Add convertible bond shares using if-converted method:\n• Shares = Bond Face Value ÷ Conversion Price (for each issue)\n• Only include if dilutive\n\nStep 4: Add any restricted stock units (RSUs) vested or assumed to vest.\n\nStep 5: Fully Diluted Shares = Basic + TSM options/warrants + Converted bond shares + RSUs.\n\nStep 6: Equity Value = Stock Price × Fully Diluted Shares.\n\nNote: Always cross-check with the company's own diluted share count in their EPS footnotes — companies calculate this in their 10-K/10-Q. For M&A, use a full dilution schedule from the data room.",
  },

  // ══════════════════════════════════════════════════════════
  // VALUATION — IBIG-04-05 (Valuation & DCF Analysis)
  // ══════════════════════════════════════════════════════════
  {
    topic: "valuation", difficulty: "beginner", source: "guide_extracted",
    question: "What are the three main valuation methodologies and when is each most appropriate?",
    answer: "1. DCF Analysis — Values based on intrinsic value. Forecast future unlevered free cash flows, discount at WACC to get EV, subtract net debt to get equity value. Best for: companies with predictable cash flows, long operating history. Weakness: very sensitive to assumptions.\n\n2. Comparable Company Analysis (Trading Comps) — Values based on how public peers are trading. Apply multiples from comps (EV/EBITDA, P/E) to subject company metrics. Best for: when liquid, relevant public comps exist. Reflects real-time market pricing.\n\n3. Precedent Transaction Analysis — Applies multiples from prior M&A deals. Includes a control premium (typically 20-30% above trading value). Best for: M&A contexts, fairness opinions. Weakness: sparse data, historical deals may not reflect current market.\n\nIn practice, all three are run simultaneously and displayed in a football field chart. The 'answer' is the range of overlap.",
  },
  {
    topic: "valuation", difficulty: "intermediate", source: "guide_extracted",
    question: "Walk me through a DCF analysis step by step.",
    answer: "1. Project Unlevered Free Cash Flow (UFCF) for 5-10 years:\nUFCF = EBIT × (1 − tax rate) + D&A − Capex − Increase in Net Working Capital\n\n2. Calculate WACC:\nWACC = (E/V) × Cost of Equity + (D/V) × Cost of Debt × (1 − tax rate)\nCost of Equity via CAPM = Risk-Free Rate + Beta × Equity Risk Premium\n\n3. Calculate Terminal Value (end of projection period):\n• Gordon Growth Model: TV = UFCF × (1+g) ÷ (WACC − g)\n• Exit Multiple: TV = Terminal Year EBITDA × EV/EBITDA multiple\n\n4. Discount all cash flows (including TV) back to today at WACC.\n\n5. Sum PV of FCFs + PV of Terminal Value = Enterprise Value.\n\n6. Subtract Net Debt → Equity Value. Divide by diluted shares → implied share price.\n\n7. Build a sensitivity table varying WACC vs. terminal growth rate (or exit multiple).",
  },
  {
    topic: "valuation", difficulty: "intermediate", source: "guide_extracted",
    question: "What is Unlevered Free Cash Flow (UFCF) and how is it different from Levered Free Cash Flow (LFCF)?",
    answer: "UFCF (Free Cash Flow to Firm) = Cash flow available to ALL capital providers (debt and equity), before debt service:\nUFCF = EBIT × (1 − t) + D&A − Capex − ΔNWC\n\nAlso calculated as: EBITDA × (1 − t) + D&A × t − Capex − ΔNWC\n\nLFCF (Free Cash Flow to Equity) = Cash flow available to equity holders only, after debt service:\nLFCF = Net Income + D&A − Capex − ΔNWC ± Net Borrowing\n\nIn a DCF:\n• Use UFCF → discount at WACC → get Enterprise Value → subtract Net Debt → Equity Value\n• Use LFCF → discount at Cost of Equity → directly get Equity Value\n\nUFCF is more commonly used because it's capital-structure neutral — you can compare across companies regardless of leverage, and because WACC is easier to estimate than the changing cost of equity for a levered firm.",
  },
  {
    topic: "valuation", difficulty: "intermediate", source: "guide_extracted",
    question: "How do you calculate WACC? Walk through each component.",
    answer: "WACC = (E/V) × Ke + (D/V) × Kd × (1 − t)\n\nWhere:\n• E = market value of equity; D = market value of debt; V = E + D\n• Ke = cost of equity; Kd = cost of debt; t = tax rate\n\nCost of Equity (Ke) via CAPM:\nKe = Rf + β × ERP\n• Rf = risk-free rate (10-year Treasury yield, typically 4-5%)\n• β = levered beta (from comparable companies, relevered to target's cap structure)\n• ERP = equity risk premium (typically 5-6%, from Damodaran)\n\nCost of Debt (Kd):\n• Use YTM of outstanding bonds or average interest rate on debt\n• Multiply by (1 − t) for the tax shield (interest is tax-deductible)\n\nWeights:\n• Use TARGET capital structure (market value), not current or book value\n• Industry-average leverage ratios inform the target structure\n\nHigher WACC → lower DCF value. The discount rate is the most sensitive input in any DCF.",
  },
  {
    topic: "valuation", difficulty: "advanced", source: "guide_extracted",
    question: "How do you unlever and relever beta? Why is this necessary?",
    answer: "Beta measures systematic risk. A levered beta reflects both business risk AND financial risk from leverage. We unlever to isolate pure business risk, then relever to the target company's capital structure.\n\nUnlevering (Hamada equation):\nBeta_Unlevered = Beta_Levered ÷ [1 + (1 − t) × (D/E)]\n\nProcess:\n1. Find comparable public companies\n2. Get each comp's levered beta from Bloomberg/CapIQ\n3. Unlever each using their own D/E and tax rate\n4. Average the unlevered betas (removes capital structure noise)\n5. Relever using the TARGET company's D/E and tax rate\n\nRelevering:\nBeta_Relevered = Beta_Unlevered × [1 + (1 − t) × (D/E)_target]\n\nWhy necessary: A company with 0% debt has low beta from its capital structure. One with 70% debt has higher equity beta due to leverage. To compare apples to apples across comps with different leverage, you strip out financial risk, then reapply it for the specific subject company.",
  },
  {
    topic: "valuation", difficulty: "intermediate", source: "guide_extracted",
    question: "What are the two methods for calculating terminal value in a DCF? What are the pros and cons of each?",
    answer: "1. Gordon Growth Model (Perpetuity Growth):\nTV = UFCF_n × (1 + g) ÷ (WACC − g)\n• g = long-term sustainable growth rate (typically GDP growth ~2-3%)\n• Pro: Theoretically sound, intrinsic\n• Con: Extremely sensitive to g; small changes cause large swings. Hard to defend a specific g. Implies a specific exit multiple — often implied multiple is unreasonably high or low.\n\n2. Exit Multiple:\nTV = Terminal Year EBITDA × EV/EBITDA Multiple\n• Multiple anchored to current trading comps\n• Pro: More intuitive, market-calibrated, easier to defend\n• Con: Makes the DCF circular (your 'intrinsic' DCF now depends on market multiples). Embeds current market sentiment.\n\nBest practice: Run both, cross-check. From GGM, back into the implied exit multiple. From exit multiple, back into the implied growth rate. If they're consistent with industry norms, your terminal value is defensible. TV often represents 60-80% of total DCF value — it deserves the most scrutiny.",
  },
  {
    topic: "valuation", difficulty: "intermediate", source: "guide_extracted",
    question: "What factors drive differences in EV/EBITDA multiples between comparable companies?",
    answer: "Higher multiples commanded by companies with:\n\n1. Faster growth — revenue and EBITDA growth drives premium multiples. Fastest-grower in a sector almost always trades highest.\n\n2. Higher margins — better EBITDA margin signals competitive advantage and pricing power.\n\n3. More recurring revenue — subscription/SaaS models trade at premium vs. transactional. High net retention rates reduce risk.\n\n4. Lower capex intensity — higher EBITDA-to-FCF conversion means more cash available to investors.\n\n5. Larger scale / market leadership — lower risk, better liquidity, more defensible position.\n\n6. Industry/sector tailwinds — secular growth sectors (tech, healthcare) vs. cyclical/declining sectors.\n\n7. Balance sheet quality — less leverage = lower risk = higher multiple.\n\nWhen presenting comps, always explain outliers. Don't blindly include a company trading at 20x when the median is 10x without explaining why (M&A speculation, turnaround, unusual metrics).",
  },
  {
    topic: "valuation", difficulty: "beginner", source: "guide_extracted",
    question: "What is a football field chart and how is it used in a banker presentation?",
    answer: "A football field chart is a horizontal bar chart showing the valuation range implied by each methodology side by side — like a football field viewed from above.\n\nEach row = one methodology (DCF, trading comps, precedent transactions, 52-week trading range, analyst price targets).\nEach bar = the low-to-high range of implied values for that method.\n\nUsed in:\n• Fairness opinions: Board needs to know if deal price is 'fair' — chart shows whether price falls within the ranges\n• Pitch books: Shows buyers/sellers where a company might trade in different scenarios\n• M&A advisory: Establishes negotiating range and walk-away prices\n\nBest practice: Show a vertical line marking the current price or proposed deal price. The overlap region across multiple methodologies is the most defensible valuation zone. Always explain why ranges differ — a wide DCF range vs. a tight comps range tells a story about visibility vs. uncertainty.",
  },
  {
    topic: "valuation", difficulty: "advanced", source: "guide_extracted",
    question: "What are the limitations of a DCF analysis?",
    answer: "1. Garbage in, garbage out — highly sensitive to assumptions. A 1% change in WACC or terminal growth rate can change value by 20-30%.\n\n2. Terminal value dominates — often 60-80%+ of total value. Tiny errors in long-term assumptions have enormous impact.\n\n3. Self-referential WACC — WACC depends on capital structure, which depends on value, which depends on WACC (circular).\n\n4. Projections are uncertain — 5-10 year forecasts for cyclical or disruptive businesses are unreliable.\n\n5. Ignores optionality — DCFs undervalue companies with embedded real options (drug pipelines, exploration rights, early-stage platforms).\n\n6. Wrong for certain business types — banks, insurance companies (don't have clear 'free cash flow'), early-stage startups with no near-term cash flows.\n\n7. Management bias — projections often come from management who are incentivized to present optimistic scenarios.\n\nDespite these, DCF is the most rigorous intrinsic valuation method and is always run alongside comps and precedents.",
  },
  {
    topic: "valuation", difficulty: "advanced", source: "guide_extracted",
    question: "How do you select the appropriate discount rate for a DCF, and what happens to value if you use a higher rate?",
    answer: "The discount rate should reflect the riskiness of the cash flows being discounted:\n\n• For UFCF (to the firm): use WACC\n• For LFCF (to equity): use Cost of Equity\n• For highly uncertain/speculative cash flows: use a higher rate\n• For regulated utilities or stable cash flows: lower WACC (~6-8%)\n• For high-growth tech/biotech: WACC often 12-15%+\n\nHow WACC is determined:\n1. CAPM for cost of equity (risk-free rate + beta × ERP)\n2. After-tax cost of debt\n3. Target capital structure weights\n\nHigher discount rate → lower present value:\n• Each future cash flow is divided by a larger number → smaller present value\n• Terminal value is hit hardest (it's the most distant cash flow)\n• This is why high-growth companies that derive most value from terminal growth are extremely sensitive to rate changes — tech stocks fell sharply in 2022 when rates rose\n\nCalibration: Cross-check implied valuation against comps. If your DCF gives an absurd answer, revisit the discount rate assumptions first.",
  },

  // ══════════════════════════════════════════════════════════
  // MERGER MODELS — IBIG-04-06 (M&A Deals & Merger Models)
  // ══════════════════════════════════════════════════════════
  {
    topic: "merger_models", difficulty: "beginner", source: "guide_extracted",
    question: "What is accretion/dilution analysis and why does it matter in M&A?",
    answer: "Accretion/dilution measures whether an acquisition increases or decreases the acquirer's EPS.\n\n• Accretive: Pro forma EPS > Acquirer standalone EPS — deal 'adds' earnings per share\n• Dilutive: Pro forma EPS < Acquirer standalone EPS — deal 'reduces' earnings per share\n• Breakeven: No change\n\nCalculation:\nPro forma EPS = (Acquirer Net Income + Target Net Income + Synergies − Costs) ÷ Pro forma diluted shares\n\nWhy it matters: Boards care about EPS because markets often price stocks on EPS multiples. A dilutive deal can put downward pressure on the acquirer's stock. However, EPS dilution ≠ value destruction — a strategically sound deal with great synergies may be dilutive near-term but value-creating long-term.\n\nKey drivers: purchase price, deal currency (cash vs. stock), synergies, cost of financing, and D&A on written-up assets.",
  },
  {
    topic: "merger_models", difficulty: "intermediate", source: "guide_extracted",
    question: "Walk me through a merger model — what are the key steps?",
    answer: "1. Determine the purchase price: Offer price per share × target diluted shares outstanding. Add net debt if applicable.\n\n2. Determine deal financing: Cash on hand, new debt issuance, new stock issuance, or a mix. Each has different EPS and balance sheet implications.\n\n3. Purchase Price Allocation (PPA): Allocate purchase price to fair value of net assets. Write up PP&E, identify intangibles (customer relationships, brand, patents), record goodwill as the residual.\n\n4. Build pro forma income statement: Combine acquirer + target. Add synergies. Subtract: interest expense on new debt, lost interest income on cash used, D&A on written-up assets, transaction fees (one-time).\n\n5. Calculate pro forma net income → pro forma EPS = Net Income ÷ pro forma diluted shares.\n\n6. Compare to acquirer standalone EPS → accretive or dilutive?\n\n7. Build sensitivity table: vary purchase price and synergies to show accretion/dilution matrix.",
  },
  {
    topic: "merger_models", difficulty: "intermediate", source: "guide_extracted",
    question: "What is the difference between a cash deal and a stock deal in M&A, and how does each affect accretion/dilution?",
    answer: "Cash Deal:\n• Acquirer pays cash (own cash or debt-financed)\n• Target shareholders receive cash, no new acquirer shares issued\n• EPS denominator (shares) does not increase\n• Accretive when: target earnings yield (1/P/E) > after-tax cost of cash/debt used\n• Interest expense on new debt reduces net income\n\nStock Deal:\n• Acquirer issues new shares to target shareholders\n• EPS denominator increases (more shares outstanding)\n• Accretive when: Acquirer P/E > Target P/E (acquirer's high multiple 'buys' cheaper earnings)\n• No cash outflow, no interest expense\n\nMixed Deal: Blend of cash and stock — most large deals are mixed.\n\nKey insight: High-P/E acquirers prefer stock (can 'buy' lower-P/E targets accretively). Low-P/E acquirers prefer debt-funded cash deals (if after-tax borrowing cost < target earnings yield). In 2021-2022 rising rate environment, cash deals became more expensive, pushing acquirers toward stock.",
  },
  {
    topic: "merger_models", difficulty: "intermediate", source: "guide_extracted",
    question: "What is purchase price allocation and how does it affect post-deal financial statements?",
    answer: "Purchase Price Allocation (PPA) is the process under ASC 805 (GAAP) / IFRS 3 of allocating the total purchase price to the fair value of the target's assets and liabilities.\n\nProcess:\n1. Fair value all tangible assets (PP&E, inventory) — usually written up from book to FMV\n2. Identify and value intangible assets not on target's balance sheet (customer lists, brands, patents, backlog, technology)\n3. Fair value liabilities\n4. Goodwill = Purchase Price − Net Fair Value of Identifiable Assets\n\nPost-close income statement impacts (all drag earnings):\n• PP&E write-up → higher D&A\n• Intangibles step-up → amortization expense\n• Inventory write-up → COGS spike in Q1 as written-up inventory flows through\n• Deferred revenue haircut → lower recognized revenue\n\nThis is why acquirers often show poor GAAP earnings in the quarters after closing — PPA creates real accounting charges. Analysts often focus on 'cash EPS' or 'adjusted EPS' that add back deal-related amortization.",
  },
  {
    topic: "merger_models", difficulty: "intermediate", source: "guide_extracted",
    question: "What are synergies in M&A? What types exist and how do you model them?",
    answer: "Synergies = incremental value created by combining two companies that neither could create alone.\n\nCost Synergies (more reliable, faster to achieve):\n• Headcount reduction (duplicate functions: finance, HR, IT, legal, procurement)\n• Facility consolidation\n• Procurement savings (combined purchasing volume)\n• IT/systems consolidation\n• Elimination of public company costs\nTypically 70-80% realized within 2-3 years.\n\nRevenue Synergies (less certain, take longer):\n• Cross-selling each other's products to combined customer base\n• Geographic expansion\n• Pricing power from reduced competition\n• Bundling/upselling combined product sets\nOften haircut 50% in financial models due to uncertainty.\n\nModeling approach:\n• Phase in over 2-3 years (not Day 1 — takes time to realize)\n• Deduct integration costs to achieve synergies\n• Tax-affect cost synergies\n• Net Synergies = Gross Synergies − Integration Costs\n\nStrategic buyers can pay more than PE firms because they capture synergies — this creates the control premium.",
  },
  {
    topic: "merger_models", difficulty: "advanced", source: "guide_extracted",
    question: "How do you determine the maximum price a strategic buyer should pay for an acquisition?",
    answer: "The maximum price (walk-away price) is the highest price where the deal still makes financial sense.\n\nFor strategic buyers, typically defined as:\n1. EPS-neutral price: The highest price where pro forma EPS ≥ acquirer standalone EPS (with synergies). Beyond this, the deal becomes dilutive.\n\n2. Balance sheet constraint: The max debt the acquirer can add while maintaining their credit rating and investment-grade status. Lenders and rating agencies impose practical limits.\n\n3. Returns threshold: Some companies require deals to exceed their cost of capital on a standalone IRR basis.\n\nCalculation approach:\n• Work backwards from accretion/dilution breakeven (or target accretion)\n• Build a sensitivity table: rows = purchase price, columns = synergy level\n• The cells where EPS accretion ≥ 0% (or target) are the feasible purchase prices\n• Also model debt capacity and credit metrics at each price level\n\nFor PE buyers: walk-away is where IRR falls below threshold (typically 20%+). Structure a deal that hits IRR at max price with a realistic exit.",
  },
  {
    topic: "merger_models", difficulty: "advanced", source: "guide_extracted",
    question: "What is a break-up fee / reverse break-up fee and when are they used in M&A?",
    answer: "Break-Up Fee (Target termination fee): Paid by the target to the acquirer if the deal falls through due to the target's actions (e.g., board decides to accept a higher competing bid, shareholders vote against the deal). Typically 1-3% of deal value.\n\nReverse Break-Up Fee: Paid by the acquirer to the target if the deal falls through due to the acquirer's failure (most commonly, failure to secure regulatory approval or financing). Typically 3-6% of deal value, sometimes higher.\n\nWhy they exist:\n• Compensate the non-terminating party for time, cost, and lost opportunity\n• Create commitment and deter parties from walking away for frivolous reasons\n• Signal confidence: a buyer willing to pay a large reverse break-up fee signals they believe the deal will close\n\nIn leveraged buyouts, large reverse break-up fees (sometimes called 'equity commitment letters') are critical — if the PE firm can't secure financing, the target needs compensation for having been locked up.",
  },
  {
    topic: "merger_models", difficulty: "intermediate", source: "guide_extracted",
    question: "What is the difference between a merger of equals and a standard acquisition? How does it affect the model?",
    answer: "Standard Acquisition: One company clearly acquires another. Acquirer pays a premium (typically 20-40%). Target shareholders receive cash or acquirer stock. Acquirer consolidates 100% of target.\n\nMerger of Equals (MOE): Two similarly sized companies combine. No clear acquirer/target. Shareholders of both companies receive shares in the combined entity. No traditional premium (or minimal one). Usually framed as a 'strategic combination.'\n\nModel differences:\n• In a MOE, both companies contribute to the combined entity at book value + agreed exchange ratio\n• Accretion/dilution less meaningful since neither side 'paid a premium'\n• Instead, focus is on synergies and strategic positioning\n• PPA is still done — one party is technically the 'accounting acquirer' for consolidation purposes\n• Combined company typically gets a new name/brand\n\nReality: True mergers of equals are rare. Usually one company dominates the combined entity's management and board, making it a de facto acquisition.",
  },

  // ══════════════════════════════════════════════════════════
  // LBO — IBIG-04-07 (Leveraged Buyouts & LBO Models)
  // ══════════════════════════════════════════════════════════
  {
    topic: "lbo", difficulty: "beginner", source: "guide_extracted",
    question: "What is a leveraged buyout (LBO) and why do private equity firms use leverage?",
    answer: "An LBO is the acquisition of a company using a significant amount of borrowed money — typically 50-70% of the purchase price — with the acquired company's assets and cash flows serving as collateral.\n\nWhy use leverage:\n1. Amplify equity returns: If you buy a $1B company with $300M equity + $700M debt, and exit at $1.5B, your equity grew from $300M to $800M (2.7x return) vs. only 1.5x if you'd paid all cash.\n\n2. Tax shield: Interest payments are tax-deductible, reducing taxable income and taxes paid.\n\n3. Discipline: Heavy debt forces management to focus on cash flow generation and operational efficiency.\n\n4. Capital efficiency: PE firms deploy less equity per deal, allowing them to invest across more deals.\n\nThe trade-off: Leverage amplifies losses too. If the business underperforms, fixed debt service can cause financial distress or bankruptcy.",
  },
  {
    topic: "lbo", difficulty: "intermediate", source: "guide_extracted",
    question: "Walk me through an LBO model step by step.",
    answer: "1. Entry Assumptions: Purchase price (e.g., 8x EBITDA), LTM EBITDA at entry, financing mix (% debt, % equity).\n\n2. Sources & Uses Table:\n• Uses: Equity purchase price + transaction fees + financing fees\n• Sources: Senior debt + subordinated debt/HY bonds + sponsor equity + rollover equity\n\n3. Debt Schedule: Model each debt tranche with interest rates, amortization, and cash sweep. Calculate annual interest expense and mandatory paydown. Use excess FCF to pay down most expensive debt first.\n\n4. Operating Model (3-5 years): Project revenue, EBITDA, D&A. Calculate taxes and net income. Build to Free Cash Flow (EBITDA − interest − taxes − capex − ΔWC).\n\n5. Exit Assumptions: Exit year (typically Year 5), exit multiple (same, higher, or lower than entry), calculate exit EV.\n\n6. Returns:\n• Exit Equity Value = Exit EV − Remaining Debt at Exit\n• MOIC = Exit Equity ÷ Equity Invested\n• IRR = Solve via XIRR function (entry cash out, exit cash in)\n\n7. Sensitize: IRR matrix with entry multiple vs. exit multiple, and entry multiple vs. EBITDA growth rate.",
  },
  {
    topic: "lbo", difficulty: "intermediate", source: "guide_extracted",
    question: "What are the three main drivers of returns in an LBO?",
    answer: "1. EBITDA Growth (Operational Value Creation): Growing the business through revenue growth, margin expansion, or add-on acquisitions. Higher EBITDA at exit → higher exit EV (at same multiple). The most sustainable and respected source of returns.\n\nExample: Buy at 8x on $100M EBITDA ($800M EV), grow to $150M EBITDA, exit at 8x → $1,200M EV. Pure operational value creation.\n\n2. Multiple Expansion: Exiting at a higher EV/EBITDA multiple than entry. Less controllable — depends on market conditions, sector re-rating, improved business quality. Cannot be reliably underwritten.\n\nExample: Buy at 8x, same EBITDA, exit at 10x → 25% EV increase from re-rating alone.\n\n3. Leverage / Debt Paydown: FCF pays down debt → exit EV is the same, but the equity slice grows as debt shrinks.\n\nExample: Buy for $800M (30% equity, 70% debt). Pay down $200M of debt. Exit at same $800M EV → equity is now worth $400M vs. $240M at entry.\n\nBest LBOs generate returns through EBITDA growth. Multiple expansion and financial engineering are supplemental — deals relying solely on leverage and multiple expansion are fragile.",
  },
  {
    topic: "lbo", difficulty: "intermediate", source: "guide_extracted",
    question: "What makes an ideal LBO candidate?",
    answer: "Cash Flow Characteristics:\n• Stable, predictable, recurring revenues (supports debt service)\n• High EBITDA margins\n• Low capex requirements (high FCF conversion from EBITDA)\n• Low working capital intensity\n\nBusiness Quality:\n• Market leader with defensible competitive position / moat\n• Non-cyclical, recession-resistant revenue streams\n• Diversified customer base (no single customer >10% of revenue)\n• Limited technology disruption risk\n\nBalance Sheet / Structure:\n• Clean balance sheet with minimal existing debt\n• Meaningful tangible assets as collateral for lenders\n• No legacy liabilities (environmental, pension, litigation)\n\nOperational Upside:\n• Identifiable cost-cutting opportunities\n• Add-on acquisition opportunities in fragmented market\n• Management team capable of executing the business plan\n\nExit Visibility:\n• Multiple exit paths: strategic sale, secondary PE sale, IPO\n\nClassic examples: Business process outsourcing, healthcare services, government IT, specialty chemicals, consumer staples brands. Anti-examples: high-growth/early-stage companies, semiconductor manufacturers, heavy R&D businesses, highly cyclical industrials.",
  },
  {
    topic: "lbo", difficulty: "intermediate", source: "guide_extracted",
    question: "What is the difference between MOIC and IRR? Which do PE firms care more about?",
    answer: "MOIC (Multiple of Invested Capital) = Total Cash Returned ÷ Total Equity Invested.\n• Measures total absolute return\n• Does not account for time — a 3x MOIC in 2 years vs. 10 years is the same MOIC but very different IRR\n• Simple to calculate: Exit Equity / Entry Equity\n\nIRR (Internal Rate of Return) = The discount rate at which NPV of all cash flows = 0.\n• Accounts for timing — earlier cash returns boost IRR significantly\n• Calculated via XIRR in Excel: IRR(dates, cash flows)\n• PE firms typically target 20-25%+ net IRR\n\nWhich matters more? Both matter, but in different contexts:\n• LPs (investors in PE funds) care about IRR for fund performance benchmarking and J-curve analysis\n• GPs often care more about MOIC for a single deal — a 3x MOIC is a simple story\n• Short-hold deals: IRR wins (2x in 1 year = 100% IRR). Long-hold deals: MOIC tells a better story (2x in 7 years = ~10% IRR)\n\nCommon PE benchmark: 2.5-3.0x MOIC, 20-25% IRR over a 5-year hold.",
  },
  {
    topic: "lbo", difficulty: "advanced", source: "guide_extracted",
    question: "Describe the typical debt capital structure in an LBO. What are the key tranches?",
    answer: "Senior Secured (First Lien):\n• Revolving Credit Facility (Revolver): Flexible draw/repay for working capital. Lowest rate, first priority. Often $50-200M.\n• Term Loan B (TLB): Bullet maturity (7 years), minimal amortization (1%/year). Floating rate (SOFR + 300-500bps). Held by institutional investors. Most common in large LBOs.\n• Term Loan A (TLA): Amortizing (20%/year), held by banks. More conservative. Less common in sponsor deals.\n\nSecond Lien / Unitranche:\n• Second lien term loan: Higher rate, subordinate in security but senior in payment. Common in mid-market.\n• Unitranche: Single blended facility replacing multiple layers — simpler and faster for mid-market deals.\n\nHigh-Yield (Subordinated) Bonds:\n• Unsecured, fixed coupon, publicly traded\n• 8-12% coupon, 8-10 year maturity\n• No maintenance covenants (cov-lite)\n\nMezzanine / PIK Notes:\n• Highest rate (12-18%), last in line for repayment\n• May include PIK option (pay interest with more debt)\n• Sometimes includes equity warrants\n\nEquity:\n• Sponsor equity (30-50%), management rollover, co-investors\n\nLenders size tranches based on leverage ratios (Net Debt/EBITDA) and interest coverage ratios (EBITDA/Interest).",
  },
  {
    topic: "lbo", difficulty: "advanced", source: "guide_extracted",
    question: "What is a PIK note and when is it used in LBOs?",
    answer: "PIK (Payment-In-Kind): A form of debt where interest is not paid in cash but instead accrues as additional principal. The lender receives more debt (or sometimes equity) instead of cash coupons.\n\nMechanism: $100M PIK note at 12% interest. After Year 1: Principal grows to $112M. After Year 2: $125.4M. Compounds upward until maturity or exit.\n\nWhen used:\n• When the LBO target doesn't generate enough cash flow to service all tranches in cash\n• To increase total leverage beyond what cash-pay lenders will provide\n• In 'dividend recap' structures to extract equity without selling the company\n• More common in secondary buyouts and large club deals with aggressive structures\n\nWhy borrowers like it: Preserves cash in early years for debt paydown on senior tranches.\n\nWhy it's risky: The growing principal balance can snowball — if the company's value doesn't grow as fast as the PIK balance, the sponsor equity gets wiped out.\n\nPIK Toggle: Borrower can elect to pay cash OR PIK for each period. Offers flexibility; lenders charge a spread premium for the option.",
  },
  {
    topic: "lbo", difficulty: "intermediate", source: "guide_extracted",
    question: "How does a dividend recapitalization work and how does it affect LBO returns?",
    answer: "A dividend recapitalization (dividend recap) is when a PE-owned company takes on additional debt to pay a special cash dividend to its equity sponsors, returning capital without selling the company.\n\nMechanism:\n1. Portfolio company borrows new debt (term loan or HY bonds)\n2. Proceeds flow to the PE firm as a dividend\n3. The company now has more leverage on its balance sheet\n\nImpact on returns:\n• MOIC: Dividend is an early cash inflow → counts toward total cash returned → boosts MOIC\n• IRR: Significantly improves IRR because cash is returned earlier (time value of money). Returning $100M in Year 2 vs. Year 5 meaningfully increases IRR.\n• Risk: Post-recap, the company has higher leverage and less cushion. If operations deteriorate, elevated debt increases distress risk.\n\nWhen it happens: In strong market environments when credit is cheap and lenders are willing to lever up. Common at peak of credit cycles.\n\nLP reaction: LPs love dividend recaps in the short term (boosts fund IRR). But critics argue they extract value from the company at the expense of long-term health and creditors.",
  },
  {
    topic: "lbo", difficulty: "advanced", source: "guide_extracted",
    question: "If the entry multiple is 8x EBITDA and you want to achieve a 20% IRR over 5 years, what exit multiple would you need assuming no leverage paydown and flat EBITDA?",
    answer: "This is a pure multiple expansion problem.\n\nGiven:\n• Entry multiple: 8x EBITDA\n• Target IRR: 20% over 5 years\n• Assume: no debt paydown, flat EBITDA, and a simplified all-equity structure for this calculation\n\nA 20% IRR over 5 years requires a ~(1.20)^5 = 2.49x MOIC.\n\nIf EBITDA is flat and there's no debt paydown:\n• Entry EV = 8x EBITDA\n• Required Exit EV = 8 × 2.49 = ~19.9x EBITDA — clearly unrealistic\n\nThis illustrates why flat-EBITDA, no-leverage-paydown scenarios cannot deliver 20% IRR solely through multiple expansion. In a real LBO:\n• Leverage reduces the equity check to ~30-40% of EV\n• Debt paydown via FCF expands the equity slice even at same EV\n• EBITDA growth multiplied by the exit multiple creates EV growth\n\nReal LBO: Assuming 3x equity (30% of 10x EV), 5-year hold, 20% IRR:\nRequired MOIC ≈ 2.49x. Exit Equity = Entry Equity × 2.49. Exit EV = Exit Equity + Remaining Debt. Solve for exit multiple given assumed debt paydown and EBITDA growth.",
  },
];

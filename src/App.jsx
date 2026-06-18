import { useState, useRef, useEffect } from "react";

const T = {
  bg:"#0d1117",surface:"#161b22",card:"#1c2333",border:"#30363d",
  orange:"#E65100",orangeL:"#ff6d00",text:"#e6edf3",muted:"#7d8590",
  green:"#2ea043",greenBg:"#0d2818",red:"#f85149",redBg:"#2d1b1b",
  blue:"#388bfd",purple:"#8957e5",teal:"#1abc9c",
  navy:"#0D1B3D",cream:"#FEF9F3",gold:"#C9A84C",
};

const MODULES = [
  {id:"A",title:"Foundations",color:T.blue,icon:"🧱",description:"Understand what AI is and how to think about it"},
  {id:"B",title:"Prompt Mastery",color:T.orange,icon:"✍️",description:"Write prompts that get professional results every time"},
  {id:"C",title:"Workflow Automation",color:T.purple,icon:"⚙️",description:"Replace repetitive tasks with AI-powered drafts"},
  {id:"D",title:"Advanced Use",color:T.teal,icon:"🚀",description:"Unlock Claude's full power for complex work"},
];

const LESSONS = [
  {id:1,module:"A",title:"What is Claude AI?",icon:"🤖",tagline:"Understand what AI assistants actually do",color:T.blue,
    theory:[
      {heading:"Claude is like a very smart assistant",body:"Claude is an AI — Artificial Intelligence. Think of it as a knowledgeable assistant you can talk to by typing. You ask it something, it responds. No buttons to memorize. No complicated menus. Just words."},
      {heading:"It was trained, not programmed",body:"Claude doesn't follow a rigid script. It was trained on a massive amount of text — books, articles, documents — and learned from patterns in all of it. Like a person who has read millions of books and can synthesize ideas from them."},
      {heading:"You talk to it in plain language",body:"You don't need special commands or code. Type exactly how you'd speak:\n\"Write me a memo about our new policy\"\n\"Explain this contract in simple terms\"\n\"Summarize these notes into a report\"\nThat's all it takes."},
      {heading:"It produces drafts, not decisions",body:"Claude gives you a strong starting point. You review, edit, and own the final output. Think of it as a very fast first-draft generator — not a replacement for your judgment or expertise."},
    ],
    quiz:{question:"What is the most accurate description of Claude AI?",options:["A search engine that finds information online","An assistant you communicate with in plain language to create content and solve problems","A voice-activated system that requires special commands","A database that stores your company's documents"],correct:1,explanation:"Claude responds to natural language — you just type what you need, like talking to a knowledgeable colleague."},
    output:{label:"🎉 Your First AI Output",description:"Let's generate a simple workplace introduction using what you just learned.",fields:[{id:"role_desc",label:"Your Role",placeholder:"e.g. Site Engineer / HR Officer / Accounting Staff"},{id:"sbu",label:"Your Company / SBU",placeholder:"e.g. AAC Construction / PHI Real Estate / AMICI Maritime"},{id:"task",label:"One task you do regularly",placeholder:"e.g. writing daily reports / processing payroll / coordinating with suppliers"}],systemPrompt:"You are a friendly professional writing assistant for a Philippine conglomerate. Write a short, warm workplace introduction paragraph (3–4 sentences) for the employee described. Make it sound natural and human, not robotic.",buildPrompt:(f)=>`Write a workplace introduction for: ${f.role_desc} at ${f.sbu}. They regularly do: ${f.task}.`,successNote:"You just used Claude to generate real content. That's the entire foundation — ask clearly, get a professional output."},
  },
  {id:2,module:"A",title:"What Claude Can and Can't Do",icon:"⚖️",tagline:"Set the right expectations from the start",color:T.blue,
    theory:[
      {heading:"What Claude is excellent at",body:"• Writing and editing any document\n• Summarizing long texts into key points\n• Drafting emails, memos, reports, letters\n• Explaining complex topics in simple terms\n• Brainstorming ideas and options\n• Translating between Filipino and English\n• Creating templates and SOPs\n• Reviewing and improving your drafts"},
      {heading:"What Claude cannot do",body:"• Access the internet or look up live information\n• See your files unless you paste the content in\n• Remember previous conversations (each session starts fresh)\n• Make decisions on your behalf\n• Guarantee 100% accuracy on facts and figures — always verify numbers"},
      {heading:"Claude sometimes makes mistakes",body:"AI can confidently state something incorrect. This is called a \"hallucination.\" Always verify facts, names, dates, and numbers from authoritative sources. Use Claude for the writing — verify the content yourself."},
      {heading:"Think of Claude as a brilliant intern",body:"Extremely fast, knowledgeable, eager to help — but still needs your guidance, review, and approval before anything goes out. You are the professional. Claude is your tool."},
    ],
    quiz:{question:"A colleague says 'Claude told me the project budget is PHP 2.3 million — it must be correct.' What should you tell them?",options:["Claude is always accurate, trust it","Claude may have made up that figure — always verify numbers from official records","Claude only makes mistakes with grammar, not numbers","Claude has access to company databases so it must be right"],correct:1,explanation:"Claude can confidently state incorrect information ('hallucinate'). Always verify facts, figures, and names against authoritative sources."},
    output:{label:"📋 AI Capability Briefing",description:"Generate a team briefing memo about responsible AI use.",fields:[{id:"dept",label:"Your Department",placeholder:"e.g. Construction Management / HR / Finance / Admin"},{id:"use_cases",label:"3 tasks your team could use AI for",placeholder:"e.g. drafting site reports, writing job postings, summarizing meeting notes"},{id:"cautions",label:"One thing your team should be careful about",placeholder:"e.g. budget figures, employee records, legal documents"}],systemPrompt:"You are an internal communications specialist at a Philippine conglomerate. Write a short, practical AI briefing memo (1 page) for a specific department. Cover: what AI can help with, what to be careful about, and 3 quick tips for getting started. Tone: practical, friendly, non-technical.",buildPrompt:(f)=>`Write an AI briefing memo for the ${f.dept} department.\nTasks they could use AI for: ${f.use_cases}\nKey caution for their work: ${f.cautions}`,successNote:"This memo is ready to share with your colleagues. You just created a real onboarding document using AI."},
  },
  {id:3,module:"A",title:"Your First Real Conversation",icon:"💬",tagline:"Learn to interact naturally and iterate",color:T.blue,
    theory:[
      {heading:"Claude is conversational, not a one-shot tool",body:"You don't need to get the perfect output on the first try. Claude remembers everything in your current conversation. You can say:\n\"Make it shorter.\"\n\"Add a section for action items.\"\n\"Rewrite this in Filipino.\"\n\"That's too formal — make it more casual.\"\nJust keep talking to it."},
      {heading:"The follow-up is where the magic happens",body:"First response: decent draft.\nAfter one follow-up: much better.\nAfter two follow-ups: often excellent.\n\nDon't accept the first output if it's not right. Tell Claude exactly what to fix, and it will."},
      {heading:"You can give Claude feedback mid-conversation",body:"\"The tone is wrong — this needs to sound more authoritative.\"\n\"Too long — cut it to 3 paragraphs.\"\n\"The opening is weak — rewrite just the first paragraph.\"\n\"Add more specific details about the timeline.\"\nClaude responds to direct, specific feedback like a professional editor."},
      {heading:"Start with context, then ask",body:"Instead of: \"Write a report.\"\nTry: \"I'm a project engineer at a construction company in the Philippines. I need to write a weekly progress report for my project manager. Here are my notes: [paste notes]\"\n\nContext transforms the output from generic to genuinely useful."},
    ],
    quiz:{question:"Claude's first output isn't quite what you needed. What's the best next step?",options:["Start a completely new conversation from scratch","Give up and write it manually","Tell Claude exactly what to fix in a follow-up message","Accept it as-is because that's all AI can do"],correct:2,explanation:"Follow-up instructions are the most powerful part of using Claude. Be specific about what to change and it will improve immediately."},
    output:{label:"🔄 Iterative Draft Practice",description:"Generate a document and see how context shapes the output.",fields:[{id:"doc",label:"Document to draft",placeholder:"e.g. Memo about new attendance policy / Email to a supplier / Progress update"},{id:"context",label:"Your context",placeholder:"e.g. HR Officer at AAC Construction, communicating a new biometric attendance rule starting July 1"},{id:"details",label:"Key details to include",placeholder:"e.g. Effective July 1, grace period 15 mins, violations result in deduction"}],systemPrompt:"You are a professional business writer for a Philippine conglomerate. Draft the requested document using the context and details provided. Format it correctly. After the document, add a short note: 'Want to refine this? Tell me what to change — tone, length, format, or content.'",buildPrompt:(f)=>`Draft: ${f.doc}\nContext: ${f.context}\nDetails: ${f.details}`,successNote:"In a real Claude session, you'd reply to that closing note and keep refining. That back-and-forth is what separates average results from great ones."},
  },
  {id:4,module:"B",title:"The Anatomy of a Great Prompt",icon:"🔬",tagline:"Understand the building blocks of effective AI instructions",color:T.orange,
    theory:[
      {heading:"Every great prompt has 4 parts",body:"1. ROLE — Who should Claude be?\n2. TASK — What exactly do you need?\n3. CONTEXT — What's the background?\n4. FORMAT — How should the output look?\n\nYou don't always need all four — but the more you include, the better the result."},
      {heading:"ROLE: Give Claude a persona",body:"\"You are an experienced HR manager in the Philippines.\"\n\"You are a professional procurement officer.\"\n\"You are a licensed safety officer for a construction company.\"\n\nThis changes how Claude reasons, what vocabulary it uses, and what perspective it takes."},
      {heading:"TASK: Be specific about what you want",body:"Weak: \"Write a letter.\"\nStrong: \"Write a formal demand letter for unpaid invoices.\"\n\nWeak: \"Make a report.\"\nStrong: \"Write a 1-page executive summary of Q2 construction progress for the Board.\"\n\nThe more specific the task, the more targeted the output."},
      {heading:"FORMAT: Tell Claude how to structure it",body:"\"Use bullet points.\"\n\"Keep it to 3 paragraphs.\"\n\"Format it as a table with columns: Item, Responsible, Deadline.\"\n\"Write it in Filipino.\"\n\"Include a subject line, greeting, body, and closing.\"\n\nClaude will match whatever structure you specify."},
    ],
    quiz:{question:"Which prompt is most likely to produce a useful, polished output?",options:["Write a report about the project","Write a 1-page progress report for the project manager covering work completed this week, current issues, and next week's plan. Use clear section headers.","Project report please","Can you help with a report?"],correct:1,explanation:"Role + Task + Context + Format = a prompt that gives Claude everything it needs to produce professional output on the first try."},
    output:{label:"🔬 Full Prompt in Action",description:"Build a structured prompt and see the difference.",fields:[{id:"role",label:"ROLE — Who is Claude in this scenario?",placeholder:"e.g. An experienced construction project manager / A Philippine HR specialist"},{id:"task",label:"TASK — What exactly do you need?",placeholder:"e.g. Write a 1-page progress report covering work done this week, issues, and next steps"},{id:"context",label:"CONTEXT — Background information",placeholder:"e.g. Project: Bohol Resort Phase 2 | Week: June 9-13 | Work: Completed column B3-B5 | Issue: Rebar delivery delayed"},{id:"format",label:"FORMAT — How should it be structured?",placeholder:"e.g. Use section headers, bullet points for issues, table for action items"}],systemPrompt:"You are the role described. Execute the task using the context provided. Format the output exactly as specified. Produce a professional, complete document — no preamble.",buildPrompt:(f)=>`You are ${f.role}.\nTask: ${f.task}\nContext: ${f.context}\nFormat: ${f.format}`,successNote:"This is the full prompt anatomy at work. Role, Task, Context, Format — use this structure for every important prompt."},
  },
  {id:5,module:"B",title:"Prompts for Common PGB Documents",icon:"📄",tagline:"Ready-to-use prompt patterns for your most common work",color:T.orange,
    theory:[
      {heading:"Daily Site Report",body:"TEMPLATE:\n\"You are a site engineer. Write a daily site report for [PROJECT] on [DATE]. Manpower: [#]. Work accomplished: [DETAILS]. Issues/delays: [DETAILS]. Equipment status: [DETAILS]. Format: professional, with section headers.\""},
      {heading:"HR Notice to Explain (NTE)",body:"TEMPLATE:\n\"You are an HR Manager in a Philippine company. Draft a Notice to Explain (NTE) for [EMPLOYEE NAME], [POSITION], regarding [INCIDENT] on [DATE]. Policy violated: [POLICY]. Request explanation within 5 working days. Follow Philippine labor law standards.\""},
      {heading:"Email to Supplier / Client",body:"TEMPLATE:\n\"Write a professional email to [RECIPIENT] regarding [SUBJECT]. Key points: [POINTS]. Tone: [TONE]. Sign off as [NAME/TITLE] from [COMPANY].\""},
      {heading:"Meeting Minutes",body:"TEMPLATE:\n\"Format the following raw notes into professional minutes. Meeting: [TITLE]. Date: [DATE]. Attendees: [NAMES]. Topics: [RAW NOTES]. Include a numbered action items table with: Action, Owner, Due Date.\""},
    ],
    quiz:{question:"You need to write a Notice to Explain for an employee absent without leave for 3 days. What's most important to include in your prompt?",options:["Just ask Claude to 'write an NTE'","Employee name, specific incident, dates, policy violated, and Philippine labor law context","A general description of the situation","Only the employee's name"],correct:1,explanation:"An NTE has legal weight in the Philippines. Specific details — name, incident, dates, policy — ensure Claude produces a legally appropriate document."},
    output:{label:"📄 Generate a Real Work Document",description:"Pick one of your most common documents and generate it now.",fields:[{id:"doc_type",label:"Document Type",placeholder:"e.g. Daily site report / NTE / Supplier email / Meeting minutes"},{id:"key_details",label:"Key Details",placeholder:"Paste your raw notes, bullet points, or facts for this document"},{id:"recipient",label:"Who receives this?",placeholder:"e.g. Project Manager / HR Director / Supplier"},{id:"tone",label:"Tone",placeholder:"e.g. Formal / Firm / Professional / Friendly"}],systemPrompt:"You are an expert document writer for a Philippine construction and development conglomerate (PGB Group). Produce the requested document in correct professional format for Philippine business standards. Complete, polished, and ready to send.",buildPrompt:(f)=>`Document: ${f.doc_type}\nRecipient: ${f.recipient}\nTone: ${f.tone}\nDetails:\n${f.key_details}`,successNote:"You now have a reusable mental template for this document type. Same structure, different details, every time."},
  },
  {id:6,module:"B",title:"Advanced Prompt Techniques",icon:"🎯",tagline:"Unlock more powerful results with expert-level prompting",color:T.orange,
    theory:[
      {heading:"Ask Claude to think step by step",body:"For complex problems, add: \"Think step by step before giving your final answer.\"\n\nThis forces Claude to reason through the problem rather than jumping to a conclusion — and produces dramatically better answers for anything involving analysis, planning, or decisions."},
      {heading:"Constraints improve output quality",body:"Adding limits makes Claude more focused:\n\"Maximum 1 page.\"\n\"No jargon — write for someone with no technical background.\"\n\"Do not include financial figures.\"\n\"Write only in Filipino.\"\n\nConstraints force clarity. The more specific the boundaries, the more targeted the result."},
      {heading:"Ask for multiple options",body:"\"Give me 3 different versions of this subject line.\"\n\"Write 2 versions: one formal, one casual.\"\n\"Generate 5 possible responses to this complaint.\"\n\nGetting multiple options lets you choose the best one — or combine elements from each."},
      {heading:"Tell Claude what NOT to do",body:"\"Do not start with 'I hope this email finds you well.'\"\n\"Do not use bullet points — write in full paragraphs.\"\n\"Do not include the salary figure — leave a [SALARY] placeholder.\"\n\nNegative instructions are just as powerful as positive ones."},
    ],
    quiz:{question:"You need Claude to write a disciplinary memo and want the best possible result. Which approach works best?",options:["Just ask for the memo with no other instructions","Use role + task + context + format, add constraints, and tell it what NOT to include","Ask for the memo twice and pick the better one","Use very short prompts so Claude has creative freedom"],correct:1,explanation:"Layering techniques — role, task, constraints, negative instructions — gives Claude maximum clarity and produces the most professional output."},
    output:{label:"🎯 Multi-Version Prompt Challenge",description:"Build a constrained multi-option prompt and see the difference.",fields:[{id:"base_task",label:"What do you need?",placeholder:"e.g. Subject line for a memo about the new safety policy"},{id:"context",label:"Context",placeholder:"e.g. Announcing mandatory PPE compliance starting July 1 for all construction sites"},{id:"constraints",label:"Your constraints",placeholder:"e.g. Maximum 10 words, no jargon, must convey urgency"},{id:"versions",label:"How many versions?",placeholder:"e.g. 3 versions — one formal, one direct, one conversational"}],systemPrompt:"You are a professional communications specialist. Generate the requested number of versions as specified. Strictly follow all constraints. After each version, add one sentence explaining the strategic choice behind it.",buildPrompt:(f)=>`Task: ${f.base_task}\nContext: ${f.context}\nConstraints: ${f.constraints}\nDeliver: ${f.versions}`,successNote:"Multiple constrained options give you creative control without creative effort. Pick the best one, or mix elements from each."},
  },
  {id:7,module:"C",title:"Thinking in Templates",icon:"🗂️",tagline:"Convert any repetitive task into a reusable AI workflow",color:T.purple,
    theory:[
      {heading:"Every repetitive document has a pattern",body:"Look at any document you write regularly. It has a fixed structure — the same sections, the same kind of information — only the specific details change.\n\nSite report: date, manpower, work done, issues, recommendations.\nNTE: employee, incident, policy, request for explanation.\nPO request: item, quantity, cost, justification, urgency.\n\nOnce you see the pattern, you can turn it into an AI template."},
      {heading:"A prompt template has two parts",body:"FIXED PART: The instruction that never changes.\n\"You are a project engineer. Write a daily site report with sections: Project Info, Manpower, Work Done, Issues, Recommendations.\"\n\nVARIABLE PART: The details you fill in each time.\n\"Project: [PROJECT] | Date: [DATE] | Manpower: [#] | Work: [DETAILS]\"\n\nSave the fixed part. Change only the variable part."},
      {heading:"Where to store your prompt templates",body:"Keep a simple document — Google Docs, Notepad, Notes app — with your best prompts organized by document type:\n\n[DAILY SITE REPORT]\n[NTE LETTER]\n[SUPPLIER EMAIL]\n[WEEKLY PROGRESS REPORT]\n\nThis becomes your personal AI toolkit."},
      {heading:"Shared team prompt libraries multiply value",body:"When your whole team uses the same prompt templates, all your documents have consistent quality, tone, and format. One person builds the template; everyone benefits."},
    ],
    quiz:{question:"What's the difference between the fixed and variable parts of a prompt template?",options:["There is no difference — the whole prompt changes every time","The fixed part is the instruction structure that never changes; the variable part is the specific details you fill in each time","The fixed part is the output; the variable part is the prompt","Fixed means formal; variable means casual"],correct:1,explanation:"Fixed = the reusable scaffold (role, task, format). Variable = the specific data for this instance. Separate these and you have a reusable automation tool."},
    output:{label:"🗂️ Build a Prompt Template",description:"Turn one of your recurring documents into a reusable template.",fields:[{id:"doc",label:"Recurring document you'll automate",placeholder:"e.g. Daily site report / Weekly HR summary / Monthly expense narrative"},{id:"fixed_structure",label:"Fixed sections it always has",placeholder:"e.g. Project name, date, manpower count, work accomplished, issues, next steps"},{id:"sample_data",label:"This week's actual data",placeholder:"Paste real details for one instance of this document"}],systemPrompt:"You are a business process designer. Do two things:\n1. Produce the complete document using the sample data provided.\n2. After a divider (---), show a clean reusable prompt template with [BRACKETS] marking every variable part. Label it: 'SAVE THIS TEMPLATE'.",buildPrompt:(f)=>`Document: ${f.doc}\nFixed sections: ${f.fixed_structure}\nSample data:\n${f.sample_data}`,successNote:"You now have a real document AND a saved template. Paste that template into your notes — it's your first AI automation tool."},
  },
  {id:8,module:"C",title:"AI Workflows by Department",icon:"🏢",tagline:"Specific automation playbooks for every PGB team",color:T.purple,
    theory:[
      {heading:"Construction & Site (AAC, CSI, PSC)",body:"High-value automations:\n• Daily site progress reports from bullet notes\n• Material request letters\n• Safety reminder memos\n• Incident reports\n• Subcontractor coordination letters\n• RFI drafts\n• As-built documentation narratives"},
      {heading:"HR & People (SEAMAN, SKILLS, PSEFI, PSI)",body:"High-value automations:\n• Job postings for any position\n• NTE and disciplinary letters\n• Employee memos and announcements\n• Onboarding orientation materials\n• Performance review narratives\n• Training program outlines\n• Exit interview summaries"},
      {heading:"Real Estate & Maritime (PHI, PPC, AMICI)",body:"High-value automations:\n• Client proposal letters\n• Project status updates\n• Voyage report narratives\n• Cargo coordination emails\n• Site inspection summaries\n• Lease or contract summaries (for review, not legal advice)"},
      {heading:"Admin, Finance & Procurement",body:"High-value automations:\n• Purchase request memos\n• Vendor evaluation summaries\n• Expense narrative reports\n• Meeting minutes from raw notes\n• SOPs for any process\n• Board / management report summaries\n• Audit response letters"},
    ],
    quiz:{question:"A site supervisor has rough notes about today's construction activity. What's the fastest AI workflow?",options:["Hire a secretary to type it up","Use a saved site report prompt template — paste the notes as the variable data — generate in seconds","Ask Claude to guess what happened on site","Write it from scratch because AI can't understand construction terms"],correct:1,explanation:"This is exactly what prompt templates are for. Raw notes go in as the variable part; the fixed template does the rest. A 20-minute task becomes a 2-minute task."},
    output:{label:"🏢 Department Workflow Plan",description:"Generate a full AI workflow plan for your specific team.",fields:[{id:"dept",label:"Your Department / SBU",placeholder:"e.g. PSC Construction / HR-SEAMAN / PHI Real Estate / Finance-AAC"},{id:"top3",label:"Top 3 most time-consuming document tasks",placeholder:"e.g. 1) Daily reports 2) Supplier emails 3) Monthly summaries"},{id:"team_size",label:"Team size",placeholder:"e.g. 5 people / 12 people"}],systemPrompt:"You are an AI productivity consultant for a Philippine conglomerate. Create a practical AI workflow automation plan for the specified department. For each document task: (1) write a ready-to-use prompt template with [BRACKETS] for variables, (2) estimate time saved per week, (3) note one important caution. Format clearly with headers. Make it immediately actionable.",buildPrompt:(f)=>`Create an AI workflow plan for: ${f.dept}\nTop tasks: ${f.top3}\nTeam size: ${f.team_size}`,successNote:"This is a real implementation plan for your department. Share it with your team lead or use it as the basis for a team AI training session."},
  },
  {id:9,module:"C",title:"Handling Complex Inputs",icon:"📥",tagline:"Feed Claude messy data and get polished outputs",color:T.purple,
    theory:[
      {heading:"Claude can process raw, unstructured input",body:"You don't need to clean up your notes before giving them to Claude. You can paste:\n• Bullet points in Tagalog and English mixed\n• Incomplete sentences and abbreviations\n• Disorganized paragraphs\n• Even typos and shorthand\n\nClaude will make sense of it and produce clean output."},
      {heading:"Pasting long content into Claude",body:"For long documents, reports, or data:\n1. Copy the content\n2. Paste it directly into your prompt\n3. Tell Claude what to do with it\n\n\"Summarize this into 5 key points.\"\n\"Extract only the action items.\"\n\"Rewrite this in plain Filipino.\"\n\"Format this data into a table.\""},
      {heading:"Table and data formatting",body:"Claude can restructure messy data:\n\"Convert this into a table: Item, Quantity, Unit Cost, Total.\"\n\"Sort these issues by priority (High / Medium / Low).\"\n\"Turn these budget figures into a summary paragraph.\"\n\nGive it data in any form — get it back in any form."},
      {heading:"Multi-language input",body:"You can give Claude notes in Filipino and ask for output in English — or vice versa. Mix languages freely. Claude handles code-switching naturally, which is useful for PGB teams that work in both Filipino and English daily."},
    ],
    quiz:{question:"Your site supervisor sent a WhatsApp message in mixed Tagalog/English with rough notes. What can you do with it?",options:["You have to retype it in clean English first","Paste it directly into Claude with instructions to turn it into a formal site report in English","Claude can only process formally written English","You need special software to convert it first"],correct:1,explanation:"Claude handles messy, multilingual input naturally. Paste it as-is and tell Claude what format you want. The cleanup is Claude's job."},
    output:{label:"📥 Raw Input → Polished Output",description:"Paste messy raw notes and transform them into a clean document.",fields:[{id:"raw_input",label:"Your raw notes (paste as-is, any format, any language)",placeholder:"Paste rough notes, WhatsApp messages, bullet points, mixed language — anything"},{id:"output_type",label:"What should the output be?",placeholder:"e.g. Formal daily report / Email to management / Meeting minutes"},{id:"output_lang",label:"Output language",placeholder:"e.g. English / Filipino / Both"}],systemPrompt:"You are a professional document specialist for a Philippine conglomerate. Transform the raw input — regardless of format, language, or organization — into the requested output type. Clean up language, correct grammar, impose proper structure. The output must be professional and ready to use.",buildPrompt:(f)=>`Transform this raw input into a ${f.output_type} in ${f.output_lang}:\n\n${f.raw_input}`,successNote:"This is one of the highest-value uses of Claude: turning rough, real-world notes into professional documents instantly."},
  },
  {id:10,module:"D",title:"Claude for Analysis & Decision Support",icon:"🧠",tagline:"Use AI to think through problems, not just produce documents",color:T.teal,
    theory:[
      {heading:"Claude can help you think, not just write",body:"Beyond drafting documents, Claude can:\n• Compare options and recommend one\n• Identify risks in a plan\n• Summarize pros and cons\n• Spot gaps in a proposal\n• Suggest questions you should be asking\n• Play devil's advocate on your decisions\n\nThis is analysis support — you still make the call, but Claude helps you see more clearly."},
      {heading:"Asking Claude to review your work",body:"Paste any document and ask:\n\"What are the weaknesses in this proposal?\"\n\"Is anything missing from this report?\"\n\"What questions will management likely ask about this?\"\n\"Rate this memo for clarity and professionalism.\"\n\nClaude gives honest, useful feedback — like a second set of expert eyes."},
      {heading:"Vendor and option comparison",body:"Give Claude a list of vendors or options with details:\n\"Compare these three vendors on price, delivery time, and reliability. Recommend one and explain why.\"\n\nClaude structures the comparison clearly and gives a reasoned recommendation — saving hours of manual comparison work."},
      {heading:"Risk identification",body:"\"Here is our project plan. What are the top 5 risks we should prepare for?\"\n\n\"Here is our proposed new timekeeping policy. What employee objections should HR be ready to address?\"\n\nClaude's broad training means it can anticipate problems your team might miss."},
    ],
    quiz:{question:"You have three supplier bids for construction materials. How can Claude help?",options:["Claude can't help with decisions — only documents","Paste all three bids, ask Claude to compare them on your criteria, and request a recommendation with reasoning","Ask Claude which is cheapest without any context","Claude will automatically access the suppliers' websites"],correct:1,explanation:"Claude excels at structured comparison. Paste the bids, specify your criteria, and get a clear analysis — not a final decision, but a much clearer picture."},
    output:{label:"🧠 Analysis & Recommendation",description:"Use Claude to analyze a real decision you're facing.",fields:[{id:"decision",label:"Decision or problem you're analyzing",placeholder:"e.g. Choosing between 2 subcontractors / Evaluating 3 site locations / Responding to a client complaint"},{id:"options",label:"Options or data you have",placeholder:"Paste or describe each option with relevant details — costs, pros, cons, specs"},{id:"criteria",label:"What matters most in this decision",placeholder:"e.g. Cost, speed, quality, risk level, relationship history"}],systemPrompt:"You are a senior business analyst for a Philippine conglomerate. Analyze the options using the criteria specified. Structure your response: (1) Comparison summary, (2) Key insight per option, (3) Recommended choice with reasoning, (4) One important caveat or risk. Be direct and practical.",buildPrompt:(f)=>`Analyze: ${f.decision}\nOptions:\n${f.options}\nCriteria: ${f.criteria}`,successNote:"Claude just gave you a structured analysis. The decision is still yours — but now you have a clearer, more organized view of the options."},
  },
  {id:11,module:"D",title:"Building Your AI Toolkit",icon:"🛠️",tagline:"Create a personal system that makes you permanently faster",color:T.teal,
    theory:[
      {heading:"Your prompt library is a career asset",body:"Over time, a well-organized collection of prompt templates becomes genuinely valuable. It represents weeks of trial-and-error compressed into reusable tools. A person with a good prompt library produces in 1 hour what takes others a full day."},
      {heading:"How to organize your prompt library",body:"Recommended structure:\n\n📁 MY AI PROMPT LIBRARY\n├── Construction Reports\n│   ├── Daily Site Report\n│   └── Incident Report\n├── HR Documents\n│   ├── NTE Letter\n│   └── Job Posting\n├── Admin & Finance\n│   ├── Meeting Minutes\n│   └── Purchase Request\n└── Emails\n    ├── Client Follow-up\n    └── Supplier Inquiry"},
      {heading:"Rate and refine your prompts",body:"After generating a document, note: did it need a lot of editing? If yes, improve the prompt. Add more context, specify the format, add a constraint. Over time, your prompts get sharper and your editing time gets shorter."},
      {heading:"Share your best prompts",body:"Sharing a great prompt template with your team is a genuine contribution. It raises everyone's output quality. If you're a supervisor or manager, curating a team prompt library is a concrete way to build AI capability in your group."},
    ],
    quiz:{question:"After using a prompt template 5 times, you always have to edit the output the same way — it's always too long. What should you do?",options:["Accept that this is just how AI works","Add 'Maximum 1 page' to the fixed part of your template so it never needs that edit again","Start a new conversation each time","Use a different AI tool"],correct:1,explanation:"Every repeated edit is a prompt improvement waiting to happen. Add it to your template so the next output doesn't need that fix."},
    output:{label:"🛠️ Your Personal AI Toolkit",description:"Generate your complete, organized prompt library for your role.",fields:[{id:"role",label:"Your role and SBU",placeholder:"e.g. Site Engineer at PSC / HR Officer at SEAMAN / Admin at PHI Real Estate"},{id:"top5",label:"5 documents you create most often",placeholder:"e.g. 1) Daily reports 2) Supplier emails 3) NTE letters 4) Meeting minutes 5) Progress summaries"},{id:"audience",label:"Typical recipients of your documents",placeholder:"e.g. Project Manager, HR Director, Finance team, external clients"}],systemPrompt:"You are a senior AI productivity consultant. Create a complete, ready-to-use personal prompt library for the specified role. For each of the 5 document types: provide a complete, copy-paste-ready prompt template with [VARIABLE] placeholders clearly marked. Include a Quick Start note for each. Format clearly with headers.",buildPrompt:(f)=>`Create a personal AI prompt library for: ${f.role}\nDocument types:\n${f.top5}\nTypical recipients: ${f.audience}`,successNote:"Save this entire output. This is your personal AI toolkit — a complete, role-specific prompt library ready to use starting today."},
  },
  {id:12,module:"D",title:"AI Ethics & Responsible Use at PGB",icon:"⚖️",tagline:"Use AI powerfully and responsibly in your workplace",color:T.teal,
    theory:[
      {heading:"Always disclose when AI helped you",body:"If you're submitting an AI-assisted document for an important decision — a legal letter, a financial report, a disciplinary action — be transparent with your supervisor that AI helped with the draft. You are still responsible for the content. Disclosure is professional integrity."},
      {heading:"Never put sensitive data into public AI tools",body:"Do not paste into Claude:\n• Employee salaries or personal data\n• Confidential client contracts or bids\n• Unreleased financial results\n• Trade secrets or proprietary processes\n\nClaude.ai is a third-party tool. Treat it like sending an email to an outside party."},
      {heading:"AI output needs human review — always",body:"Before any AI-drafted document goes out:\n✓ Verify all names, dates, and figures\n✓ Check that the tone matches your company's standards\n✓ Confirm nothing legally important is missing\n✓ Make it sound like you — edit freely\n\nYou are the professional. The document carries your name."},
      {heading:"AI amplifies your skills — it doesn't replace them",body:"The best AI users are people who deeply understand their job. They know what a good site report looks like. They know what an NTE should contain.\n\nClaude makes skilled people dramatically more productive. Invest in both your craft and your AI skills."},
    ],
    quiz:{question:"Your manager asks you to submit a financial report. You used Claude to write the narrative section. What's the right approach?",options:["Submit it without mentioning AI","Tell your manager AI helped draft it, verify all figures yourself, and take full responsibility for the content","Let Claude write everything including the financial figures without checking them","Refuse to use AI for anything reviewed by management"],correct:1,explanation:"Transparency + verification + accountability = responsible AI use. AI is a tool you used; the document is yours. Disclose, verify, own it."},
    output:{label:"⚖️ Your Team AI Use Guide",description:"Create a practical responsible AI guide for your team.",fields:[{id:"team",label:"Your team or department",placeholder:"e.g. Site Engineering team / HR Department / Finance and Admin"},{id:"ai_uses",label:"How your team will use AI",placeholder:"e.g. Daily reports, NTE letters, meeting minutes, email drafts"},{id:"sensitivities",label:"Sensitive information in your work that must stay private",placeholder:"e.g. Employee disciplinary records, project bid prices, client personal data"}],systemPrompt:"You are a corporate policy writer. Draft a short, practical AI Responsible Use Guide (1 page) for a specific team at a Philippine conglomerate. Cover: approved uses, what NOT to paste into AI tools, review requirements before submitting AI-assisted documents, and a simple 3-step checklist. Tone: clear, practical, non-bureaucratic.",buildPrompt:(f)=>`Write an AI Responsible Use Guide for: ${f.team}\nApproved uses: ${f.ai_uses}\nSensitive info to protect: ${f.sensitivities}`,successNote:"This guide is ready to share with your team. Responsible AI use starts with clear, practical guidelines — and you just created one."},
  },
];

// ── HELPERS ──────────────────────────────────────────────────────
function ProgressBar({pct,color}){
  return(
    <div style={{height:4,background:T.border,borderRadius:4,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${Math.min(100,pct)}%`,background:color||T.orange,borderRadius:4,transition:"width 0.5s ease"}}/>
    </div>
  );
}
function TypingDots(){
  return(
    <span style={{display:"inline-flex",gap:4,alignItems:"center"}}>
      {[0,1,2].map(i=>(
        <span key={i} style={{width:7,height:7,borderRadius:"50%",background:T.muted,display:"inline-block",animation:`tdot 1.2s ease-in-out ${i*0.2}s infinite`}}/>
      ))}
      <style>{`
        @keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(0.85);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
        @media print{
          body{background:#fff!important;}
          #cert-print{display:block!important;}
          #app-root{display:none!important;}
        }
      `}</style>
    </span>
  );
}
function CopyBtn({text}){
  const [c,setC]=useState(false);
  return(
    <button onClick={()=>{navigator.clipboard.writeText(text);setC(true);setTimeout(()=>setC(false),2000)}}
      style={{background:c?T.green+"33":T.surface,border:`1px solid ${c?T.green:T.border}`,color:c?T.green:T.muted,borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer",transition:"all 0.2s"}}>
      {c?"✓ Copied":"⎘ Copy"}
    </button>
  );
}

// ── CERTIFICATE COMPONENT ────────────────────────────────────────
function Certificate({name,onBack}){
  const certRef=useRef(null);
  const today=new Date().toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"});

  function handlePrint(){
    window.print();
  }

  function handleDownload(){
    const content=certRef.current;
    const printWindow=window.open("","_blank","width=900,height=650");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PGB AI Certificate — ${name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .cert { ${content.getAttribute("data-styles")} }
        </style>
      </head>
      <body>${content.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(()=>{ printWindow.print(); },800);
  }

  const certStyles = `
    width:842px;height:595px;background:linear-gradient(135deg,#0D1B3D 0%,#1a2d5a 100%);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    position:relative;padding:48px 64px;font-family:Georgia,serif;color:#FEF9F3;overflow:hidden;
  `;

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 20px 60px"}}>
      <div style={{maxWidth:700,width:"100%"}}>
        {/* Actions */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <button onClick={onBack} style={{background:T.card,border:`1px solid ${T.border}`,color:T.muted,borderRadius:8,padding:"8px 16px",fontSize:13,cursor:"pointer"}}>
            ← Back
          </button>
          <div style={{display:"flex",gap:10}}>
            <button onClick={handleDownload} style={{background:`linear-gradient(135deg,${T.orange},${T.orangeL})`,border:"none",color:"#fff",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              ⬇ Download / Print
            </button>
          </div>
        </div>

        {/* Certificate preview */}
        <div ref={certRef} data-styles={certStyles} style={{
          width:"100%",aspectRatio:"842/595",
          background:`linear-gradient(135deg,${T.navy} 0%,#1a2d5a 100%)`,
          borderRadius:16,overflow:"hidden",position:"relative",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          padding:"5% 8%",fontFamily:"Georgia,serif",color:T.cream,
          boxShadow:"0 24px 64px rgba(0,0,0,0.6)",
        }}>
          {/* Corner ornaments */}
          {[
            {top:0,left:0,transform:"none"},
            {top:0,right:0,transform:"scaleX(-1)"},
            {bottom:0,left:0,transform:"scaleY(-1)"},
            {bottom:0,right:0,transform:"scale(-1)"},
          ].map((pos,i)=>(
            <svg key={i} width="80" height="80" viewBox="0 0 80 80" style={{position:"absolute",...pos,opacity:0.35}}>
              <path d="M0,0 L40,0 L40,4 L4,4 L4,40 L0,40 Z" fill={T.gold}/>
              <path d="M8,8 L30,8 L30,12 L12,12 L12,30 L8,30 Z" fill={T.gold}/>
              <circle cx="36" cy="36" r="3" fill={T.gold}/>
            </svg>
          ))}

          {/* Side borders */}
          <div style={{position:"absolute",left:16,top:"15%",bottom:"15%",width:2,background:`linear-gradient(to bottom,transparent,${T.gold},transparent)`,opacity:0.5}}/>
          <div style={{position:"absolute",right:16,top:"15%",bottom:"15%",width:2,background:`linear-gradient(to bottom,transparent,${T.gold},transparent)`,opacity:0.5}}/>

          {/* Logo area */}
          <div style={{textAlign:"center",marginBottom:"3%"}}>
            <div style={{fontSize:"clamp(10px,2.2vw,18px)",letterSpacing:6,color:T.gold,fontFamily:"'Segoe UI',sans-serif",fontWeight:600,textTransform:"uppercase",marginBottom:"1%"}}>
              PRIMARY GROUP OF BUILDERS
            </div>
            <div style={{width:60,height:2,background:T.gold,margin:"0 auto",opacity:0.6}}/>
          </div>

          {/* Certificate of */}
          <div style={{fontSize:"clamp(8px,1.4vw,12px)",letterSpacing:5,color:T.gold,textTransform:"uppercase",fontFamily:"'Segoe UI',sans-serif",marginBottom:"2%",opacity:0.8}}>
            Certificate of Completion
          </div>

          {/* This certifies */}
          <div style={{fontSize:"clamp(8px,1.2vw,11px)",color:T.cream,opacity:0.7,marginBottom:"1.5%",fontStyle:"italic",fontFamily:"'Segoe UI',sans-serif"}}>
            This is to certify that
          </div>

          {/* Name */}
          <div style={{
            fontSize:"clamp(16px,4vw,36px)",fontWeight:700,color:T.cream,
            textAlign:"center",marginBottom:"1.5%",lineHeight:1.2,
            textShadow:`0 0 30px ${T.gold}55`,
            borderBottom:`1px solid ${T.gold}66`,paddingBottom:"1.5%",width:"70%",
          }}>
            {name}
          </div>

          {/* Body text */}
          <div style={{fontSize:"clamp(7px,1.1vw,10px)",color:T.cream,opacity:0.75,textAlign:"center",lineHeight:1.7,marginBottom:"2%",maxWidth:"65%",fontFamily:"'Segoe UI',sans-serif"}}>
            has successfully completed the
          </div>

          {/* Course name */}
          <div style={{fontSize:"clamp(10px,1.8vw,16px)",fontWeight:700,color:T.gold,textAlign:"center",marginBottom:"1%",letterSpacing:1}}>
            Claude AI Full Course
          </div>
          <div style={{fontSize:"clamp(7px,1.1vw,10px)",color:T.cream,opacity:0.65,textAlign:"center",marginBottom:"3%",fontFamily:"'Segoe UI',sans-serif",letterSpacing:1}}>
            12 Lessons · 4 Modules · Workflow Automation Practicum
          </div>

          {/* Modules */}
          <div style={{display:"flex",gap:"3%",marginBottom:"3%"}}>
            {["🧱 Foundations","✍️ Prompt Mastery","⚙️ Automation","🚀 Advanced Use"].map((m,i)=>(
              <div key={i} style={{fontSize:"clamp(6px,0.9vw,9px)",color:T.gold,opacity:0.8,fontFamily:"'Segoe UI',sans-serif",whiteSpace:"nowrap"}}>
                {m}
              </div>
            ))}
          </div>

          {/* Date + signature line */}
          <div style={{display:"flex",justifyContent:"space-between",width:"75%",marginTop:"1%"}}>
            <div style={{textAlign:"center"}}>
              <div style={{width:120,height:1,background:T.gold,opacity:0.5,marginBottom:4}}/>
              <div style={{fontSize:"clamp(6px,0.85vw,8px)",color:T.cream,opacity:0.6,fontFamily:"'Segoe UI',sans-serif",letterSpacing:1}}>DATE COMPLETED</div>
              <div style={{fontSize:"clamp(7px,1vw,9px)",color:T.cream,opacity:0.8,fontFamily:"'Segoe UI',sans-serif",marginTop:2}}>{today}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{width:120,height:1,background:T.gold,opacity:0.5,marginBottom:4}}/>
              <div style={{fontSize:"clamp(6px,0.85vw,8px)",color:T.cream,opacity:0.6,fontFamily:"'Segoe UI',sans-serif",letterSpacing:1}}>AUTHORIZED BY</div>
              <div style={{fontSize:"clamp(7px,1vw,9px)",color:T.cream,opacity:0.8,fontFamily:"'Segoe UI',sans-serif",marginTop:2}}>PGB Learning & Development</div>
            </div>
          </div>

          {/* Watermark */}
          <div style={{position:"absolute",bottom:"4%",right:"5%",fontSize:"clamp(6px,0.8vw,8px)",color:T.gold,opacity:0.3,fontFamily:"'Segoe UI',sans-serif",letterSpacing:2}}>
            PGB · AI LEARNING SERIES
          </div>
        </div>

        <p style={{textAlign:"center",color:T.muted,fontSize:13,marginTop:16}}>
          Tap <strong style={{color:T.text}}>Download / Print</strong> → your browser's print dialog will open → choose "Save as PDF" to download.
        </p>
      </div>
    </div>
  );
}

// ── REGISTRATION SCREEN ──────────────────────────────────────────
function Registration({onStart}){
  const [name,setName]=useState("");
  const [sbu,setSbu]=useState("");
  const [error,setError]=useState("");

  function handleStart(){
    if(!name.trim()){setError("Please enter your full name — it will appear on your certificate.");return;}
    onStart(name.trim(),sbu.trim());
  }

  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:480,width:"100%",animation:"pop 0.4s ease"}}>
        <style>{`@keyframes pop{0%{transform:scale(0.92);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:56,marginBottom:14}}>🤖</div>
          <h1 style={{fontSize:24,fontWeight:800,margin:"0 0 10px",color:T.text}}>Claude AI Full Course</h1>
          <p style={{color:T.muted,fontSize:14,lineHeight:1.7,margin:0}}>
            12 lessons · 4 modules · Real AI workflow outputs<br/>
            <span style={{color:T.orange,fontWeight:600}}>Complete the course and earn a certificate.</span>
          </p>
        </div>

        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:"28px 24px"}}>
          <div style={{fontSize:13,fontWeight:700,color:T.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:20}}>
            Before We Start
          </div>

          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:T.muted,marginBottom:6,letterSpacing:0.5,textTransform:"uppercase"}}>
              Your Full Name <span style={{color:T.orange}}>*</span>
            </label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)}
              placeholder="e.g. Maria Santos"
              style={{width:"100%",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,color:T.text,padding:"11px 14px",fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.orange}
              onBlur={e=>e.target.style.borderColor=T.border}
            />
            <div style={{fontSize:11,color:T.muted,marginTop:5}}>⚠ This will appear on your completion certificate — enter it exactly as you want it displayed.</div>
          </div>

          <div style={{marginBottom:24}}>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:T.muted,marginBottom:6,letterSpacing:0.5,textTransform:"uppercase"}}>
              Department / SBU <span style={{color:T.muted,fontWeight:400}}>(optional)</span>
            </label>
            <input type="text" value={sbu} onChange={e=>setSbu(e.target.value)}
              placeholder="e.g. AAC Construction / HR-SEAMAN / PHI Real Estate"
              style={{width:"100%",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,color:T.text,padding:"11px 14px",fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor=T.orange}
              onBlur={e=>e.target.style.borderColor=T.border}
            />
          </div>

          {error&&<div style={{background:T.redBg,border:`1px solid ${T.red}44`,borderRadius:10,padding:"10px 14px",fontSize:13,color:T.red,marginBottom:16}}>{error}</div>}

          <button onClick={handleStart} style={{width:"100%",padding:14,background:`linear-gradient(135deg,${T.orange},${T.orangeL})`,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
            Start the Course →
          </button>

          <div style={{display:"flex",gap:16,marginTop:20,justifyContent:"center"}}>
            {MODULES.map(m=>(
              <div key={m.id} style={{textAlign:"center"}}>
                <div style={{fontSize:18}}>{m.icon}</div>
                <div style={{fontSize:10,color:T.muted,marginTop:2}}>{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function App(){
  const [participantName,setParticipantName]=useState("");
  const [screen,setScreen]=useState("register"); // register|home|lesson|complete|certificate
  const [lessonId,setLessonId]=useState(1);
  const [phase,setPhase]=useState("learn");
  const [quizPicked,setQuizPicked]=useState(null);
  const [quizResult,setQuizResult]=useState(null);
  const [fields,setFields]=useState({});
  const [loading,setLoading]=useState(false);
  const [aiOutput,setAiOutput]=useState("");
  const [outputError,setOutputError]=useState("");
  const [completed,setCompleted]=useState([]);
  const [activeModule,setActiveModule]=useState("A");
  const outputRef=useRef(null);

  const lesson=LESSONS.find(l=>l.id===lessonId)||LESSONS[0];
  const totalLessons=LESSONS.length;
  const pct=Math.round((completed.length/totalLessons)*100);

  useEffect(()=>{if(aiOutput)outputRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},[aiOutput]);

  function handleRegister(name){setParticipantName(name);setScreen("home");}

  function startLesson(id){
    setLessonId(id);setPhase("learn");setQuizPicked(null);
    setQuizResult(null);setFields({});setAiOutput("");setOutputError("");
    setScreen("lesson");window.scrollTo(0,0);
  }
  function goToQuiz(){setPhase("quiz");setQuizPicked(null);setQuizResult(null);window.scrollTo(0,0);}
  function goToOutput(){setPhase("output");setAiOutput("");window.scrollTo(0,0);}
  function submitQuiz(){if(quizPicked===null)return;setQuizResult(quizPicked===lesson.quiz.correct?"correct":"wrong");}

  function finishLesson(){
    if(!completed.includes(lesson.id))setCompleted(c=>[...c,lesson.id]);
    const next=LESSONS.find(l=>l.id===lesson.id+1);
    if(next){startLesson(next.id);}else{setScreen("complete");}
  }

  async function generateOutput(){
    const missing=lesson.output.fields.filter(f=>!fields[f.id]?.trim());
    if(missing.length){setOutputError(`Fill in: ${missing.map(f=>f.label).join(", ")}`);return;}
    setOutputError("");setLoading(true);setAiOutput("");
    try{
      const res=await fetch("/api/chat",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:lesson.output.systemPrompt,messages:[{role:"user",content:lesson.output.buildPrompt(fields)}]}),
      });
      const data=await res.json();
      setAiOutput(data?.content?.[0]?.text||"No response. Try again.");
    }catch{setOutputError("Connection error. Please try again.");}
    finally{setLoading(false);}
  }

  const moduleLessons=(mId)=>LESSONS.filter(l=>l.module===mId);
  const moduleComplete=(mId)=>moduleLessons(mId).every(l=>completed.includes(l.id));
  const modulePct=(mId)=>{const ls=moduleLessons(mId);return Math.round((ls.filter(l=>completed.includes(l.id)).length/ls.length)*100);};
  const isLocked=(l)=>l.id!==1&&!completed.includes(l.id-1);

  if(screen==="register") return <Registration onStart={handleRegister}/>;
  if(screen==="certificate") return <Certificate name={participantName} onBack={()=>setScreen("complete")}/>;

  // COMPLETE
  if(screen==="complete") return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",maxWidth:540,animation:"pop 0.5s ease"}}>
        <style>{`@keyframes pop{0%{transform:scale(0.85);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}`}</style>
        <div style={{fontSize:72,marginBottom:16}}>🎓</div>
        <h1 style={{fontSize:26,fontWeight:800,color:T.text,margin:"0 0 8px"}}>Course Complete!</h1>
        <p style={{color:T.orange,fontSize:16,fontWeight:600,marginBottom:16}}>Well done, {participantName}!</p>
        <p style={{color:T.muted,fontSize:15,lineHeight:1.7,margin:"0 0 24px"}}>
          You've completed all 12 lessons across 4 modules. You now have the knowledge, the prompts, and the templates to use Claude AI as a genuine productivity system at work.
        </p>
        <div style={{background:T.card,border:`1px solid ${T.green}44`,borderRadius:14,padding:"18px 22px",marginBottom:24,textAlign:"left"}}>
          <div style={{fontSize:11,color:T.green,fontWeight:700,marginBottom:10,letterSpacing:1}}>WHAT YOU CAN NOW DO</div>
          {["Explain AI clearly to any colleague","Write prompts that produce professional documents on the first try","Automate any repetitive document task with reusable templates","Handle complex analysis and decision support with AI","Build and share a team prompt library","Use AI responsibly with proper verification and disclosure"].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8,fontSize:14,color:T.text}}>
              <span style={{color:T.green,flexShrink:0}}>✓</span>{s}
            </div>
          ))}
        </div>
        {/* Certificate CTA */}
        <div style={{background:`linear-gradient(135deg,${T.navy},#1a2d5a)`,border:`2px solid ${T.gold}55`,borderRadius:16,padding:"22px 24px",marginBottom:20}}>
          <div style={{fontSize:32,marginBottom:8}}>🏅</div>
          <div style={{fontWeight:700,fontSize:17,color:T.cream,marginBottom:6}}>Your Certificate is Ready</div>
          <div style={{fontSize:13,color:T.muted,marginBottom:16}}>Download or print your official PGB Certificate of Completion.</div>
          <button onClick={()=>setScreen("certificate")} style={{background:`linear-gradient(135deg,${T.gold},#b8963e)`,border:"none",color:T.navy,borderRadius:12,padding:"13px 32px",fontSize:15,fontWeight:800,cursor:"pointer",width:"100%"}}>
            🎓 View & Download Certificate
          </button>
        </div>
        <button onClick={()=>{setCompleted([]);setScreen("home");setActiveModule("A");}} style={{background:T.card,border:`1px solid ${T.border}`,color:T.muted,borderRadius:12,padding:"12px 28px",fontSize:14,cursor:"pointer"}}>
          ↺ Start Over
        </button>
      </div>
    </div>
  );

  // HOME
  if(screen==="home") return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <div style={{background:`linear-gradient(160deg,#0d1b3e,${T.bg})`,borderBottom:`1px solid ${T.border}`,padding:"36px 20px 28px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:10}}>🤖</div>
        <h1 style={{fontSize:24,fontWeight:800,margin:"0 0 8px",color:T.text}}>Claude AI Full Course</h1>
        <p style={{color:T.muted,fontSize:14,margin:"0 0 4px"}}>Welcome back, <strong style={{color:T.text}}>{participantName}</strong></p>
        <p style={{color:T.muted,fontSize:13,lineHeight:1.6,margin:"0 auto 16px",maxWidth:440}}>
          12 lessons · each ending with a real <strong style={{color:T.orange}}>AI workflow output</strong>
        </p>
        <div style={{maxWidth:380,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.muted,marginBottom:5}}>
            <span>{completed.length} of {totalLessons} complete</span><span>{pct}%</span>
          </div>
          <ProgressBar pct={pct} color={T.orange}/>
        </div>
        {completed.length===totalLessons&&(
          <button onClick={()=>setScreen("certificate")} style={{marginTop:16,background:`linear-gradient(135deg,${T.gold},#b8963e)`,border:"none",color:T.navy,borderRadius:10,padding:"10px 24px",fontSize:13,fontWeight:800,cursor:"pointer"}}>
            🎓 View Your Certificate
          </button>
        )}
      </div>
      {/* Module tabs */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:"0 16px",background:T.surface,display:"flex",gap:2,overflowX:"auto"}}>
        {MODULES.map(m=>(
          <button key={m.id} onClick={()=>setActiveModule(m.id)} style={{background:"none",border:"none",borderBottom:`2px solid ${activeModule===m.id?m.color:"transparent"}`,color:activeModule===m.id?m.color:T.muted,padding:"13px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>
            {m.icon} {m.title}{moduleComplete(m.id)&&<span style={{marginLeft:5,color:T.green}}>✓</span>}
          </button>
        ))}
      </div>
      {MODULES.filter(m=>m.id===activeModule).map(mod=>(
        <div key={mod.id} style={{maxWidth:680,margin:"0 auto",padding:"24px 20px 80px"}}>
          <div style={{marginBottom:18}}>
            <div style={{fontWeight:700,fontSize:17,color:mod.color,marginBottom:3}}>{mod.icon} Module {mod.id}: {mod.title}</div>
            <div style={{fontSize:13,color:T.muted,marginBottom:8}}>{mod.description}</div>
            <ProgressBar pct={modulePct(mod.id)} color={mod.color}/>
            <div style={{fontSize:11,color:T.muted,marginTop:4}}>{moduleLessons(mod.id).filter(l=>completed.includes(l.id)).length} of {moduleLessons(mod.id).length} lessons complete</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {moduleLessons(mod.id).map(l=>{
              const done=completed.includes(l.id),locked=isLocked(l);
              return(
                <button key={l.id} onClick={()=>!locked&&startLesson(l.id)} style={{background:T.card,border:`1px solid ${done?l.color+"55":T.border}`,borderRadius:12,padding:"15px 18px",textAlign:"left",cursor:locked?"not-allowed":"pointer",opacity:locked?0.4:1,display:"flex",alignItems:"center",gap:12,transition:"border-color 0.2s"}}
                  onMouseEnter={e=>{if(!locked)e.currentTarget.style.borderColor=l.color;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=done?l.color+"55":T.border;}}>
                  <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:done?l.color+"22":T.surface,border:`1px solid ${done?l.color:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                    {done?"✅":l.icon}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:T.muted,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>
                      Lesson {l.id}{done&&<span style={{color:l.color}}> · DONE</span>}{locked&&<span> · 🔒 Complete Lesson {l.id-1} first</span>}
                    </div>
                    <div style={{fontWeight:700,fontSize:14,color:T.text}}>{l.title}</div>
                    <div style={{fontSize:12,color:T.muted,marginTop:1}}>{l.tagline}</div>
                  </div>
                  {!locked&&<div style={{color:T.muted,fontSize:16}}>›</div>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // LESSON
  const lessonIndex=LESSONS.findIndex(l=>l.id===lessonId);
  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <header style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"12px 20px",position:"sticky",top:0,zIndex:20}}>
        <div style={{maxWidth:660,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:20,padding:4}}>←</button>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:T.muted,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Module {lesson.module} · Lesson {lesson.id} of {totalLessons}</div>
            <ProgressBar pct={((lessonIndex+(phase==="learn"?0.25:phase==="quiz"?0.65:1))/totalLessons)*100} color={lesson.color}/>
          </div>
          <div style={{fontSize:12,color:lesson.color,fontWeight:600,flexShrink:0}}>
            {phase==="learn"?"📖 Read":phase==="quiz"?"🧠 Quiz":"⚡ Practice"}
          </div>
        </div>
      </header>

      <div style={{maxWidth:660,margin:"0 auto",padding:"28px 20px 80px"}}>

        {phase==="learn"&&(
          <div style={{animation:"fadeUp 0.3s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
              <div style={{width:46,height:46,borderRadius:12,background:lesson.color+"22",border:`1px solid ${lesson.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{lesson.icon}</div>
              <div>
                <div style={{fontSize:11,color:lesson.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Module {lesson.module} · Lesson {lesson.id}</div>
                <div style={{fontWeight:800,fontSize:20,color:T.text}}>{lesson.title}</div>
                <div style={{fontSize:13,color:T.muted}}>{lesson.tagline}</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:26}}>
              {lesson.theory.map((t,i)=>(
                <div key={i} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${lesson.color}`,borderRadius:12,padding:"16px 18px"}}>
                  <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:6}}>{t.heading}</div>
                  <div style={{color:T.muted,fontSize:14,lineHeight:1.75,whiteSpace:"pre-line"}}>{t.body}</div>
                </div>
              ))}
            </div>
            <button onClick={goToQuiz} style={{width:"100%",padding:14,background:`linear-gradient(135deg,${lesson.color},${T.orangeL})`,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
              I've read this → Take the Quiz 🧠
            </button>
          </div>
        )}

        {phase==="quiz"&&(
          <div style={{animation:"fadeUp 0.3s ease"}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:36,marginBottom:8}}>🧠</div>
              <div style={{fontWeight:800,fontSize:20,color:T.text,marginBottom:4}}>Quick Check</div>
              <div style={{color:T.muted,fontSize:13}}>Lesson {lesson.id}: {lesson.title}</div>
            </div>
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",marginBottom:14}}>
              <div style={{fontWeight:600,fontSize:15,color:T.text,lineHeight:1.6,marginBottom:16}}>{lesson.quiz.question}</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {lesson.quiz.options.map((opt,i)=>{
                  let bg=T.surface,border=T.border,color=T.text;
                  if(quizResult){if(i===lesson.quiz.correct){bg=T.greenBg;border=T.green;color=T.green;}else if(i===quizPicked&&quizPicked!==lesson.quiz.correct){bg=T.redBg;border=T.red;color=T.red;}}
                  else if(quizPicked===i){bg=lesson.color+"22";border=lesson.color;}
                  return(
                    <button key={i} onClick={()=>!quizResult&&setQuizPicked(i)} style={{background:bg,border:`1px solid ${border}`,borderRadius:10,padding:"11px 14px",textAlign:"left",cursor:quizResult?"default":"pointer",color,fontSize:14,transition:"all 0.2s",lineHeight:1.5}}>
                      <span style={{fontWeight:700,marginRight:8}}>{["A","B","C","D"][i]}.</span>{opt}
                    </button>
                  );
                })}
              </div>
            </div>
            {quizResult&&(
              <div style={{background:quizResult==="correct"?T.greenBg:T.redBg,border:`1px solid ${quizResult==="correct"?T.green:T.red}44`,borderRadius:12,padding:"12px 16px",marginBottom:14,animation:"fadeUp 0.3s ease"}}>
                <div style={{fontWeight:700,color:quizResult==="correct"?T.green:T.red,marginBottom:5,fontSize:14}}>{quizResult==="correct"?"✅ Correct!":"❌ Not quite — but let's continue."}</div>
                <div style={{color:T.muted,fontSize:13,lineHeight:1.6}}>{lesson.quiz.explanation}</div>
              </div>
            )}
            {!quizResult?(
              <button onClick={submitQuiz} disabled={quizPicked===null} style={{width:"100%",padding:14,background:quizPicked!==null?`linear-gradient(135deg,${lesson.color},${T.orangeL})`:T.card,border:`1px solid ${quizPicked!==null?"transparent":T.border}`,borderRadius:12,color:quizPicked!==null?"#fff":T.muted,fontSize:15,fontWeight:700,cursor:quizPicked!==null?"pointer":"not-allowed"}}>
                Submit Answer
              </button>
            ):(
              <button onClick={goToOutput} style={{width:"100%",padding:14,background:`linear-gradient(135deg,${lesson.color},${T.orangeL})`,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
                {quizResult==="correct"?"Great! Now let's practice →":"Understood — let's practice →"}
              </button>
            )}
          </div>
        )}

        {phase==="output"&&(
          <div style={{animation:"fadeUp 0.3s ease"}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:36,marginBottom:8}}>⚡</div>
              <div style={{fontWeight:800,fontSize:20,color:T.text,marginBottom:6}}>{lesson.output.label}</div>
              <div style={{color:T.muted,fontSize:14,lineHeight:1.6}}>{lesson.output.description}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:14}}>
              {lesson.output.fields.map(f=>(
                <div key={f.id}>
                  <label style={{display:"block",fontSize:11,fontWeight:700,color:T.muted,marginBottom:5,letterSpacing:0.5,textTransform:"uppercase"}}>{f.label}</label>
                  {f.placeholder?.includes("\n")?(
                    <textarea value={fields[f.id]||""} onChange={e=>setFields(p=>({...p,[f.id]:e.target.value}))} placeholder={f.placeholder} rows={4}
                      style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:10,color:T.text,padding:"10px 14px",fontSize:14,resize:"vertical",fontFamily:"inherit",outline:"none",boxSizing:"border-box",lineHeight:1.5}}
                      onFocus={e=>e.target.style.borderColor=lesson.color} onBlur={e=>e.target.style.borderColor=T.border}/>
                  ):(
                    <input type="text" value={fields[f.id]||""} onChange={e=>setFields(p=>({...p,[f.id]:e.target.value}))} placeholder={f.placeholder}
                      style={{width:"100%",background:T.card,border:`1px solid ${T.border}`,borderRadius:10,color:T.text,padding:"10px 14px",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}
                      onFocus={e=>e.target.style.borderColor=lesson.color} onBlur={e=>e.target.style.borderColor=T.border}/>
                  )}
                </div>
              ))}
            </div>
            {outputError&&<div style={{background:T.redBg,border:`1px solid ${T.red}44`,borderRadius:10,padding:"10px 14px",fontSize:13,color:T.red,marginBottom:12}}>{outputError}</div>}
            <button onClick={generateOutput} disabled={loading} style={{width:"100%",padding:14,background:loading?T.card:`linear-gradient(135deg,${lesson.color},${T.orangeL})`,border:loading?`1px solid ${T.border}`:"none",borderRadius:12,color:loading?T.muted:"#fff",fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              {loading?<><TypingDots/><span>Generating…</span></>:"⚡ Generate with Claude AI"}
            </button>
            {aiOutput&&(
              <div ref={outputRef} style={{marginTop:18,animation:"fadeUp 0.4s ease"}}>
                <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
                  <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.border}`,background:T.surface,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:13,fontWeight:600,color:T.muted}}>✅ Claude's Output</span>
                    <CopyBtn text={aiOutput}/>
                  </div>
                  <div style={{padding:"16px 18px",fontSize:14,lineHeight:1.85,color:T.text,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{aiOutput}</div>
                </div>
                <div style={{background:lesson.color+"15",border:`1px solid ${lesson.color}44`,borderRadius:12,padding:"12px 16px",marginTop:10}}>
                  <div style={{fontSize:13,color:lesson.color,lineHeight:1.65}}>💡 <strong>What just happened:</strong> {lesson.output.successNote}</div>
                </div>
                <button onClick={generateOutput} style={{width:"100%",marginTop:10,padding:10,background:T.card,border:`1px solid ${T.border}`,borderRadius:10,color:T.muted,fontSize:13,cursor:"pointer"}}>↺ Regenerate</button>
                <button onClick={finishLesson} style={{width:"100%",marginTop:10,padding:14,background:`linear-gradient(135deg,${T.green},#388040)`,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>
                  {lessonIndex+1<totalLessons?`✓ Complete & Go to Lesson ${lesson.id+1} →`:"✓ Finish the Course 🎓"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

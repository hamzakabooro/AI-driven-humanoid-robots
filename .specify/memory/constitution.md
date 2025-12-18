<!-- SYNC IMPACT REPORT
Version change: N/A → 1.0.0
Modified principles: N/A (new constitution)
Added sections: All sections (new constitution)
Removed sections: N/A
Templates requiring updates: N/A (initial constitution)
Follow-up TODOs: None
-->
# AI-Driven Book Creation with Embedded RAG Chatbot Constitution

## Core Principles

### Spec-first, no assumptions
All development follows specifications first approach; No assumptions made without explicit requirements; All decisions must be traceable to spec or user requirement

### Single source of truth: Docusaurus content
Docusaurus serves as the single source of truth for all book content; All documentation, examples, and content originate from Docusaurus; No duplicate content in multiple systems

### Zero hallucination (retrieval-only answers)
RAG chatbot answers must be grounded in retrieved passages only; No hallucination or generation beyond provided content; Strict adherence to retrieval-augmented generation principles

### Clear, developer-friendly writing
All book content must be clear and accessible to developers; Technical concepts explained with practical examples; Focus on usability and comprehension

### Fully reproducible setup
Complete setup and deployment process must be reproducible; All dependencies and configurations documented; One-command setup for development environment

### Progressive difficulty with runnable examples
Content organized with progressive difficulty levels; All examples must be runnable and tested; Practical implementation-focused approach

## Technology Stack and Architecture Standards
Framework: Docusaurus (Markdown); Deployment: GitHub Pages; Backend: FastAPI; Vector DB: Qdrant Cloud (Free Tier); Metadata DB: Neon Serverless Postgres; LLM: OpenAI Agents / ChatKit SDKs

## Development and Review Process
Spec-driven development; All features must have clear acceptance criteria; Code reviews verify compliance with principles; Automated testing for all components; Documentation must be updated with each change

## Governance
Constitution supersedes all other practices; Amendments require documentation and approval; All PRs/reviews must verify compliance with principles; Version control follows semantic versioning; Changes must maintain backward compatibility where possible

**Version**: 1.0.0 | **Ratified**: 2025-12-18 | **Last Amended**: 2025-12-18
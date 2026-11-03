---
layout: home

hero:
  name: "@qnx/vuetify"
  text: "Vue 3 Components for Vuetify 4"
  tagline: "Form inputs, server-driven tables, and paginated lists with built-in validation and API submission."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Components
      link: /components/
    - theme: alt
      text: Playground
      link: https://qnx-vuetify-sample.vercel.app/

features:
  - icon: 📋
    title: Form Components
    details: "Text, autocomplete, date, time, color, OTP, and file inputs that bind to vee-validate by name."
    link: /components/form
    linkText: View form components

  - icon: 🚀
    title: API Submission
    details: "VqForm validates, sends the request with axios, tracks the busy state, and puts server errors on fields."
    link: /components/form/vq-form
    linkText: View VqForm

  - icon: 📊
    title: Server-side Data Table
    details: "VqDataTable wraps VDataTableServer with fetching, pagination, and sorting."
    link: /components/data/vq-data-table
    linkText: View VqDataTable

  - icon: 📜
    title: Paginated Lists
    details: "VqList fetches pages and appends them, and VqListLoadMoreBtn loads the next one."
    link: /components/data/vq-list
    linkText: View VqList

  - icon: 🔎
    title: Filters
    details: "Pair VqTableFilter with a table or list using a shared id, and it refetches when a filter changes."
    link: /components/data/vq-table-filter
    linkText: View VqTableFilter

  - icon: ⚠️
    title: Known Limitations
    details: "What the installed version doesn't do yet, confirmed by testing, with workarounds."
    link: /guide/limitations
    linkText: View limitations
---

const { buildSchema } = require('graphql');

const scalars = `
  scalar JSON
`;

const enums = `
  enum Environment {
    UAT
    SYSTEST
    PRODUCTION
    INTEGRATION
  }

  enum TTC {
    _DLA
    _DLC
    _DLD
    _DLE
    _DLP
    _DRT
    _IDA
    _IDC
    _IDP
    _IDS
    _IRT
    _SPC
    _SPD
    _SPO
    _SPR
    _SRX
    _CDA
    _DIR
    _DAF
    _04M
    _06M
    _07M
    _12M
    _13M
    _14M
    _20M
    _92M
    _98M
    _05M
    _22M
    _30U
    _38U
    _60U
    _69U
    _70U
    _FCP
    _PRF
    _07Q
    _OLI
    _10Q
  }
`;

const queries = `
  type Query {
    document: Document
  }

  type Document {
    breadcrumbs: [Breadcrumb]
    messages: [Message]
    form: [FormElement]
    footer: Footer
    activeElement: ActiveElement
    page: PageDetails
    screenshot: Screenshot
  }

  type Breadcrumb {
    class: String
    innerText: String
  }

  type Message {
    tagName: String
    innerText: String
    class: String
  }

  type FormElement {
    tagName: String
    for: String
    innerText: String
    fieldset: Fieldset
    id: String
    type: String
    name: String
    value: String
    disabled: String
    class: String
    rendered: String
    tabindex: String
    maxlength: String
    size: String
    options: [SelectOptions!]
  }

  type SelectOptions {
    innerText: String
    value: String
    selected: Boolean
  }

  type Fieldset {
    id: String
    class: String
    legend: String
  }

  type ActiveElement {
    tagName: String
    id: String
    type: String
    name: String
    class: String
    maxlength: String
    size: String
    title: String
  }

  type Footer {
    screenName: String
    transactionCode: String
    officeEmployee: String
    workDate: String
    time: String
    easeVersion: String
  }

  type PageDetails {
    url: String
    title: String
  }

  type Screenshot {
    screenshot: String
    timestamp: String
    error: String
  }
`;

const mutations = `
  type Mutation {
    login(username: String!, password: String!, environment: Environment!): Document
    screenshot: Screenshot
    typeInto(selector: String!, value: String!): TypedIntoInput
    selectOption(selector: String!, value: String, values: [String!]): DropdownSelection
    submit(value: String!): Document
    selectTransaction(ttc: String!): Document
  }

  type TypedIntoInput {
    oldValue: String!
    value: String!
    selector: String!
  }

  type DropdownSelection {
    value: String
    values: [String!]
    selector: String!
  }
`;

const combined = [scalars, enums, queries, mutations].join('\n');
module.exports = buildSchema(combined);

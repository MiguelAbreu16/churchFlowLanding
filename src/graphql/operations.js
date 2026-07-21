import { gql } from "@apollo/client";

export const PLAN_CATALOG = gql`
  query PlanCatalog {
    planCatalog {
      planCode
      name
      priceMonthly
      priceAnnual
      landingId
      paypalPlanIdMonthly
      paypalPlanIdAnnual
    }
  }
`;

export const REGISTER_CHURCH = gql`
  mutation RegisterChurch(
    $name: String!
    $adminName: String!
    $email: String!
    $password: String!
    $plan: String
    $memberCount: String
    $marketingOptIn: Boolean
    $billingCycle: String
  ) {
    registerChurch(
      name: $name
      adminName: $adminName
      email: $email
      password: $password
      plan: $plan
      memberCount: $memberCount
      marketingOptIn: $marketingOptIn
      billingCycle: $billingCycle
    ) {
      token
      exchangeCode
      user {
        id
        name
        email
        role
        churchId
      }
    }
  }
`;

export const ATTACH_PAYPAL = gql`
  mutation AttachPayPal(
    $paypalSubscriptionId: String!
    $billingCycle: String!
  ) {
    attachPayPalSubscription(
      paypalSubscriptionId: $paypalSubscriptionId
      billingCycle: $billingCycle
    ) {
      token
      user {
        id
        churchId
      }
    }
  }
`;

export const SUBMIT_CONTACT_INQUIRY = gql`
  mutation SubmitContactInquiry(
    $name: String!
    $churchName: String!
    $email: String!
    $message: String!
    $planInterest: String
    $pageUrl: String
    $userAgent: String
    $attachments: [SupportTicketAttachmentInput!]
  ) {
    submitContactInquiry(
      name: $name
      churchName: $churchName
      email: $email
      message: $message
      planInterest: $planInterest
      pageUrl: $pageUrl
      userAgent: $userAgent
      attachments: $attachments
    )
  }
`;

export const REGISTER_APOSTOL_ONLY = gql`
  # Deprecated: Apóstol is included in Plan Reino. Prefer register?plan=enterprise.
  mutation RegisterApostolOnly(
    $networkName: String!
    $adminName: String!
    $email: String!
    $password: String!
  ) {
    registerApostolOnly(
      networkName: $networkName
      adminName: $adminName
      email: $email
      password: $password
    ) {
      token
      exchangeCode
      user {
        id
        name
        email
        role
        churchId
        activeNetworkId
      }
    }
  }
`;

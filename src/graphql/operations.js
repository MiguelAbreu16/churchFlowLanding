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

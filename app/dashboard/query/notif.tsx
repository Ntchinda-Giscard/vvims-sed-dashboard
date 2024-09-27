import { gql } from "@apollo/client";

export const GET_NOTIF = gql`
subscription MySubscription {
  employee_notifications_stream(batch_size: 10, cursor: {initial_value: {is_read: false}}) {
    message
    title
  }
}`
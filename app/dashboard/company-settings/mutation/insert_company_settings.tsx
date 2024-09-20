import { gql } from "@apollo/client";

export const INSERT_COMPANY_SETTINGS = gql`
    mutation InsertCompaySettings($company_id: uuid!, $end_work_time: time!, $max_late_time: interval!, $max_leave_days_per_year: Int = null, $number_of_leave_days: Int = null, $start_work_time: time!, $working_days: [Int!]!) {
        insert_company_settings_one(object: {company_id: $company_id, end_work_time: $end_work_time, max_late_time: $max_late_time, max_leave_days_per_year: $max_leave_days_per_year, number_of_leave_days: $number_of_leave_days, start_work_time: $start_work_time, working_days: $working_days}) {
            id
        }
    }`
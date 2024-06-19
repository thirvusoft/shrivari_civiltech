// Copyright (c) 2024, Thirvusoft Private Limited and contributors
// For license information, please see license.txt

frappe.query_reports["Upcoming Notice Due Dates"] = {
	"filters": [
		{
			fieldname: 'from_date',
			label: 'From Date',
			fieldtype: 'Date',
			reqd: 1
		},
		{
			fieldname: 'to_date',
			label: 'To Date',
			fieldtype: 'Date',
			reqd: 1
		},


	]
};

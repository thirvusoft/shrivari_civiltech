# Copyright (c) 2024, Thirvusoft Private Limited and contributors
# For license information, please see license.txt
from frappe import _
import frappe

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

def get_columns(filters):
    columns = [
        {
            'fieldname': 'notice_id',
            'label': _('Notices ID'),
            'fieldtype': 'Link',
            'options': 'Auditing Document',
            'width' : 200
        },
        {
            'fieldname': 'date_of_notice',
            'label': _('Date of Notice'),
            'fieldtype': 'Date',
            'width' : 150

        },
        {
            'fieldname': 'due_date',
            'label': _('Due Date'),
            'fieldtype': 'Date',
            'width' : 150

        },
        {
            'fieldname': 'company',
            'label': _('Company'),
            'fieldtype': 'Data',
            'width' : 250

        },
    ]
    return columns

def get_data(filters):
    conditions = []
    
    if filters.get('from_date'):
        conditions.append("ad.due_date_for_reply__action >= %(from_date)s")
    if filters.get('to_date'):
        conditions.append("ad.due_date_for_reply__action <= %(to_date)s")
    
    conditions_str = " AND ".join(conditions) if conditions else "1=1"

    query = f"""
        SELECT 
            ad.name AS notice_id,
            ad.date AS date_of_notice,
            ad.due_date_for_reply__action AS due_date,
            ad.company AS company
        FROM 
            `tabAuditing Document` ad
        WHERE
            {conditions_str}
        ORDER BY
            ad.due_date_for_reply__action ASC
    """

    data = frappe.db.sql(query, filters, as_dict=True)
    return data

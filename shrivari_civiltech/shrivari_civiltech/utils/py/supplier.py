import frappe
from erpnext.controllers.accounts_controller import get_payment_terms

def validate(doc,event):
    if not doc.get('__islocal'):
        is_eligible = False
        payment_template = ''
        if doc.custom_eligible_for_msme:
            is_eligible = True
            if doc.supplier_type in ['Micro','Small']:
                payment_template = frappe.db.get_single_value('Thirvusoft Settings','template_for_non_applicable_supplier_type')
                list_trading_type = frappe.get_all('Applicable Supplier Trading Type',{'parentfield':'supplier_trading_type','parent':'Thirvusoft Settings'},['supplier_trading_type'],pluck='supplier_trading_type')

                if doc.custom_trading_type in list_trading_type:
                    payment_template = frappe.db.get_single_value('Thirvusoft Settings','template_for_applicable_supplier_type')

        if is_eligible and payment_template:
            doc.payment_terms = payment_template
            # if doc.doctype == 'Purchase Order':
            #     posting_date = doc.get("transaction_date")
            # elif doc.doctype == 'Purchase Invoice':
            #     posting_date = doc.get("posting_date")
            # grand_total = doc.get("rounded_total") or doc.grand_total
            # base_grand_total = doc.get("base_rounded_total") or doc.base_grand_total
            # data = get_payment_terms(
            #         doc.payment_terms_template, posting_date, grand_total, base_grand_total
            #     )
            # if data:
            #     doc.payment_schedule = []
            #     for item in data:
            #         doc.append("payment_schedule", item)
        else:
            doc.payment_terms = ''
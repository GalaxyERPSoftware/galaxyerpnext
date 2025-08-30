# import frappe

# def execute():
#     if not frappe.db.has_column("Testing Doc", "account_no"):
#         frappe.db.add_column("Testing Doc", "account_no", "VARCHAR(140)")
#         frappe.db.commit()
import frappe

def execute():
    # Only proceed if the table for DocType exists
    if frappe.db.table_exists("Testing Doc"):
        if not frappe.db.has_column("Testing Doc", "account_no"):
            frappe.db.add_column("Testing Doc", "account_no", "varchar(140)")

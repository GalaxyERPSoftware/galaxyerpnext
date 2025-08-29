import frappe
from frappe.utils import cint

def custom_validate_columns_width(self):
    """
    Allow unlimited total column width.
    Removes frappe's default 10-column width restriction.
    """
    total_column_width = 0.0
    for row in getattr(self, "selected_columns_for_grid", []) or []:
        try:
            if getattr(row, "columns", None):
                total_column_width += cint(row.columns)
        except Exception as e:
            frappe.logger().exception(e)

    # 🔹 No validation, only log
    frappe.logger().info(f"[grid_row_override] total_column_width = {total_column_width}")

def override_gridrow():
    """Monkey-patch GridRow.validate_columns_width"""
    try:
        from frappe.model.grid_row import GridRow
        GridRow.validate_columns_width = custom_validate_columns_width
        frappe.logger().info("✅ GridRow.validate_columns_width monkeypatched by galaxynext")
    except Exception as e:
        frappe.logger().exception(e)


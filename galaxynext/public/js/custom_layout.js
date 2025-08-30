frappe.provide('frappe.ui.form');

frappe.ui.form.GridRow = class CustomGridRow extends frappe.ui.form.GridRow {
    set_df_property(df, property, value) {
        if (property === "columns") {
            let total_columns = 0;

            // Sum up columns for all fields in this grid row
            (this.docfields || []).forEach(d => {
                if (d.columns) {
                    total_columns += d.columns;
                }
            });

            // Add the new value too
            total_columns += value;

            if (total_columns > 10) {
                frappe.throw(__('can not be add more then 10.'));
            }
        }
        super.set_df_property(df, property, value);
    }
};
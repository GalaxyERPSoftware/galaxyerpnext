frappe.provide("frappe.ui.form");

frappe.after_ajax(() => {
    if (frappe.ui.form.GridRow) {
        console.log("✅ GridRow validation override in Form Builder");

        frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
            // Skip validation completely
            return true;
        };
    }
});







// (() => {
//   // safety check
//   if (!frappe.ui || !frappe.ui.form || !frappe.ui.form.GridRow) return;

//   console.log("✅ GridRow validate_columns_width override loaded");

//   // Override only this method
//   frappe.ui.form.GridRow.prototype.validate_columns_width = function () {
//     let total_column_width = 0.0;

//     (this.selected_columns_for_grid || []).forEach((row) => {
//       if (row.columns && row.columns > 0) {
//         total_column_width += cint(row.columns);
//       }
//     });

//     if (total_column_width && total_column_width > 10) {
//       // 👇 your custom message
//       frappe.throw(__("It's my error"));
//     }
//   };
// })();




// import GridRowForm from "./grid_row_form";

// export default class GridRow {
//     constructor(opts) {
//         this.on_grid_fields_dict = {};
//         this.on_grid_fields = [];
//         $.extend(this, opts);
//         this.set_docfields();
//         this.columns = {};
//         this.columns_list = [];
//         this.depandant_fields = {
//             mandatory: [],
//             read_only: [],
//         };
//         this.row_check_html = '<input type="checkbox" class="grid-row-check">';
//         this.make();
//     }

//     make() {
//         let me = this;
//         let render_row = true;

//         this.wrapper = $('<div class="grid-row"></div>');
//         this.row = $('<div class="data-row row"></div>')
//             .appendTo(this.wrapper)
//             .on("click", function (e) {
//                 if (
//                     $(e.target).hasClass("grid-row-check") ||
//                     $(e.target).hasClass("row-index") ||
//                     $(e.target).parent().hasClass("row-index")
//                 ) {
//                     return;
//                 }
//                 if (me.grid.allow_on_grid_editing() && me.grid.is_editable()) {
//                     // pass
//                 } else {
//                     me.toggle_view();
//                     return false;
//                 }
//             });

//         if (this.grid.template && !this.grid.meta.editable_grid) {
//             this.render_template();
//         } else {
//             render_row = this.render_row();
//         }

//         if (!render_row) return;

//         this.set_data();
//         this.wrapper.appendTo(this.parent);
//     }

//     // Other methods...

//     insert(show, below, duplicate) {
//         // Check the number of existing rows
//         const currentRowCount = this.grid.get_data().length;

//         // Validate if adding a new row exceeds the limit
//         if (currentRowCount >= 10) {
//             frappe.throw(__("You cannot add more than 10 rows."));
//             return; // Exit the function if the limit is reached
//         }

//         var idx = this.doc.idx;
//         var copy_doc = duplicate ? this.doc : null;
//         if (below) idx++;
//         this.toggle_view(false);
//         this.grid.add_new_row(idx, null, show, copy_doc);
//     }

//     // Other methods...
// }







// frappe.provide("frappe.ui.form");

// frappe.ui.form.GridRow = class CustomGridRow extends frappe.ui.form.GridRow {
//     validate_columns_width() {
//         let total_column_width = 0.0;
//         this.selected_columns_for_grid.forEach((row) => {
//             if (row.columns && row.columns > 0) {
//                 total_column_width += cint(row.columns);
//             }
//         });

//         // 👇 Custom validation
//         if (total_column_width && total_column_width > 6) {
//             frappe.throw(__("🛑 GalaxyNext: Total grid width cannot be more than 6."));
//         }
//     }
// };





frappe.pages['custom_dashboard'].on_page_load = function(wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Custom Dashboard',
        single_column: true
    });

    $(frappe.render_template("custom_dashboard", {})).appendTo(page.body);

    // Example: Fetch customers and insert into table
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Customer",
            fields: ["name", "customer_name", "customer_group"],
            limit_page_length: 10
        },
        callback: function(r) {
            if (r.message) {
                let tbody = $(page.body).find("#custom-dashboard-body");
                tbody.empty(); // clear default rows
                r.message.forEach((cust, idx) => {
                    let row = `
                        <tr>
                          <td>${idx + 1}</td>
                          <td>${cust.name}</td>
                          <td>${cust.customer_name}</td>
                          <td>${cust.customer_group}</td>
                          <td>Col 4</td>
                          <td>Col 5</td>
                          <td>Col 6</td>
                          <td>Col 7</td>
                          <td>Col 8</td>
                          <td>Col 9</td>
                          <td>Col 10</td>
                          <td>Col 11</td>
                          <td>Col 12</td>
                          <td>Col 13</td>
                          <td>Col 14</td>
                          <td>Col 15</td>
						  <td>Col 16</td>
                        </tr>`;
                    tbody.append(row);
                });
            }
        }
    });
};

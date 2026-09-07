const EMAIL_TO = "gautamsamdhiya2000@gmail.com";

function sendDailySalesReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const raw = ss.getSheetByName("Raw_Data");
  if (!raw) throw new Error('Sheet "Raw_Data" not found.');

  const data = raw.getDataRange().getValues();
  if (data.length < 2) throw new Error("Raw_Data does not contain any records.");

  const headers = data[0].map(String);
  const col = {};
  headers.forEach((header, index) => col[header.trim().toLowerCase()] = index);

  let deliveredOrders = 0, deliveredUnits = 0, revenue = 0, profit = 0;
  let returned = 0, cancelled = 0;
  const productSales = {}, categorySales = {}, channelSales = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = String(row[col.order_status]).trim();

    if (status === "Delivered") {
      deliveredOrders++;
      deliveredUnits += Number(row[col.quantity]) || 0;
      revenue += Number(row[col.revenue]) || 0;
      profit += Number(row[col.profit]) || 0;

      const product = String(row[col.product_name]).trim();
      const category = String(row[col.category]).trim();
      const channel = String(row[col.sales_channel]).trim();

      productSales[product] = (productSales[product] || 0) + (Number(row[col.revenue]) || 0);
      categorySales[category] = (categorySales[category] || 0) + (Number(row[col.revenue]) || 0);
      channelSales[channel] = (channelSales[channel] || 0) + (Number(row[col.revenue]) || 0);
    }

    if (status === "Returned") returned++;
    if (status === "Cancelled") cancelled++;
  }

  const totalRecords = data.length - 1;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const aov = deliveredOrders > 0 ? revenue / deliveredOrders : 0;
  const returnRate = totalRecords > 0 ? (returned / totalRecords) * 100 : 0;
  const cancellationRate = totalRecords > 0 ? (cancelled / totalRecords) * 100 : 0;

  const topProduct = getTopEntry(productSales);
  const topCategory = getTopEntry(categorySales);
  const topChannel = getTopEntry(channelSales);

  writeAutomationReport(ss, {
    generatedAt: new Date(),
    deliveredOrders, deliveredUnits, revenue, profit, profitMargin,
    aov, returned, cancelled, returnRate, cancellationRate,
    topProduct, topCategory, topChannel
  });

  const subject = "Daily Sales Report | " +
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM yyyy");

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;">
      <h2>Sales Analytics Daily Report</h2>
      <p style="color:#666;">Generated automatically from Google Sheets</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px;border:1px solid #ddd;"><b>Delivered Orders</b><br>${deliveredOrders.toLocaleString()}</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>Delivered Units</b><br>${deliveredUnits.toLocaleString()}</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>Revenue</b><br>${formatINR(revenue)}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;"><b>Profit</b><br>${formatINR(profit)}</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>Profit Margin</b><br>${profitMargin.toFixed(2)}%</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>AOV</b><br>${formatINR(aov)}</td>
        </tr>
        <tr>
          <td style="padding:12px;border:1px solid #ddd;"><b>Return Rate</b><br>${returnRate.toFixed(2)}%</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>Cancellation Rate</b><br>${cancellationRate.toFixed(2)}%</td>
          <td style="padding:12px;border:1px solid #ddd;"><b>Total Records</b><br>${totalRecords.toLocaleString()}</td>
        </tr>
      </table>
      <h3>Top Performers</h3>
      <ul>
        <li><b>Top Product:</b> ${topProduct.name} — ${formatINR(topProduct.value)}</li>
        <li><b>Top Category:</b> ${topCategory.name} — ${formatINR(topCategory.value)}</li>
        <li><b>Top Channel:</b> ${topChannel.name} — ${formatINR(topChannel.value)}</li>
      </ul>
    </div>`;

  const plainTextBody =
    "Sales Analytics Daily Report\n\n" +
    "Delivered Orders: " + deliveredOrders + "\n" +
    "Delivered Units: " + deliveredUnits + "\n" +
    "Revenue: " + formatINR(revenue) + "\n" +
    "Profit: " + formatINR(profit) + "\n" +
    "Profit Margin: " + profitMargin.toFixed(2) + "%\n" +
    "AOV: " + formatINR(aov) + "\n" +
    "Return Rate: " + returnRate.toFixed(2) + "%\n" +
    "Cancellation Rate: " + cancellationRate.toFixed(2) + "%\n";

  MailApp.sendEmail({to: EMAIL_TO, subject: subject, body: plainTextBody, htmlBody: htmlBody,
                     name: "Gautam Sales Analytics Automation"});
}

function getTopEntry(obj) {
  const entries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  return entries.length ? {name: entries[0][0], value: entries[0][1]} : {name: "N/A", value: 0};
}

function formatINR(value) {
  return "₹" + Number(value).toLocaleString("en-IN", {maximumFractionDigits: 2});
}

function writeAutomationReport(ss, report) {
  let sheet = ss.getSheetByName("Automation_Report");
  if (!sheet) sheet = ss.insertSheet("Automation_Report");

  sheet.clear();
  const rows = [
    ["AUTOMATION REPORT", ""],
    ["Generated At", report.generatedAt],
    ["", ""],
    ["Metric", "Value"],
    ["Delivered Orders", report.deliveredOrders],
    ["Delivered Units", report.deliveredUnits],
    ["Revenue", report.revenue],
    ["Profit", report.profit],
    ["Profit Margin %", report.profitMargin],
    ["AOV", report.aov],
    ["Returned Orders", report.returned],
    ["Cancelled Orders", report.cancelled],
    ["Return Rate %", report.returnRate],
    ["Cancellation Rate %", report.cancellationRate],
    ["Top Product", report.topProduct.name],
    ["Top Product Revenue", report.topProduct.value],
    ["Top Category", report.topCategory.name],
    ["Top Category Revenue", report.topCategory.value],
    ["Top Channel", report.topChannel.name],
    ["Top Channel Revenue", report.topChannel.value]
  ];

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange("A1:B1").merge().setFontWeight("bold").setFontSize(16);
  sheet.getRange("A4:B4").setFontWeight("bold");
  sheet.autoResizeColumns(1, 2);
}

function setupDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === "sendDailySalesReport") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("sendDailySalesReport")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

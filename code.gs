function Getdata() {
  let spreadsheet = SpreadsheetApp.getActiveSheet();
  
  var webURL = "https://zoom.us/docs/en-us/zapps.html";
  var response = UrlFetchApp.fetch(webURL);
  var $ = Cheerio.load(response.getContentText()); 
  
  var apps = $('.app-list .app-box');
  
  for(var i = 0; i < apps.length; i++){
    var description = $(apps[i]).find('.app-detail').text();
    description = description.replace(/(?:\r\n|\r|\n)/g, ' '); //removes all newlines
    description = description.replace(/\s+/g,' ').trim(); //removes excess white space within the text
    
    var logo = $(apps[i]).find('.app-logo-wrapper').find('img').attr('src');
    logo = 'https://zoom.us'+logo
    
    var title = $(apps[i]).find('.app-title').text();
    
    let data = [title, logo, description]
    spreadsheet.appendRow(data)
    
  }
 
}

function updateData(){
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      spreadsheetId = spreadsheet.getId();
  
  var webURL = "https://zoom.us/docs/en-us/zapps.html";
  var response = UrlFetchApp.fetch(webURL);
  var $ = Cheerio.load(response.getContentText()); 
  
  var apps = $('.app-list .app-box');
  
  var presentData = getPresentData();
  
  for(var i = 0; i < apps.length; i++){
    var title = $(apps[i]).find('.app-title').text();
    
    if(!presentData.includes(title)){
      
    }
    
  }
 
  
//      requests = [
//            {
//                'insertDimension': {
//                    "range": {
//                        "sheetId": 0,
//                        "dimension": 'ROWS',
//                        "startIndex": 1,
//                        "endIndex": 2
//                    }
//                }
//            }
//        ]
//  var response = Sheets.Spreadsheets.batchUpdate({'requests': requests}, spreadsheetId)
}

function getPresentData(){
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      sheet = spreadsheet.getSheetByName("Sheet1"),
      lastRow = getLastRow();
  lastRow = lastRow - 1;
  
  let range = sheet.getRange(2,1,lastRow,1),
      values = range.getValues(),
      presentData = []

  for (var row in values) {
    for (var col in values[row]) {
      presentData.push(values[row][col])
    }
  }
  return presentData
}

function getLastRow(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  // This logs the value in the very last cell of this sheet
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var lastCell = sheet.getRange(lastRow, lastColumn);
  return lastRow;
}

function sendMail(){
  var emailBody = "Number of Infected: <b>" + itemsOfInterest + "</b>";
  
  MailApp.sendEmail({
    to: "peteriniubong@gmail.com",
    subject: "New Apps has been added to the Zapps list",
    htmlBody: emailBody
  });
}



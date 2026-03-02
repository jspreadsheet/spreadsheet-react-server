import React, {useRef} from 'react';
import { Spreadsheet, jspreadsheet } from '@jspreadsheet/react';
import formula from '@jspreadsheet/formula-pro';
import client from '@jspreadsheet/client';

import "jsuites/dist/jsuites.css";
import "jspreadsheet/dist/jspreadsheet.css";

const license = {
  clientId: '356a192b7913b04c54574d18c28d46e6395428ab',
  licenseKey: 'MWUzOGJhM2IzNGU4MzFiNTEzMzA4OWUyMGI5YWMyY2Q3ZjE0YWFiNjM3NDVkYzc0ZmZjNTA2NGVhNGZlNzg4Y2ZlMTQ5NDk5MTc1YmZjZWQxNTUyYzdiZmIxYzU2OGRkMjkzNjJlZDZlYjI0YjIxYjdjMDhmYzQwZjBlMDlhYWQsZXlKamJHbGxiblJKWkNJNklqTTFObUV4T1RKaU56a3hNMkl3TkdNMU5EVTNOR1F4T0dNeU9HUTBObVUyTXprMU5ESTRZV0lpTENKdVlXMWxJam9pVUdGMWJDQkliMlJsYkNJc0ltUmhkR1VpT2pFNE1ERXdNRGd3TURBc0ltUnZiV0ZwYmlJNld5SnFjMmhsYkd3dWJtVjBJaXdpWTNOaUxtRndjQ0lzSW1wemNISmxZV1J6YUdWbGRDNWpiMjBpTENKalpIQnVMbWx2SWl3aWFXNTBjbUZ6YUdWbGRITXVZMjl0SWl3aWMzUmhZMnRpYkdsMGVpNWpiMjBpTENKM1pXSmpiMjUwWVdsdVpYSXVhVzhpTENKM1pXSmpiMjUwWVdsdVpYSXVhVzhpTENKemRHRmphMkpzYVhSNkxtbHZJaXdpYzJaamIyUmxZbTkwTG1OdmJTSXNJbU5zWVhWa1pXMWpjR052Ym5SbGJuUXVZMjl0SWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9pSXpOQ0lzSW5OamIzQmxJanBiSW5ZM0lpd2lkamdpTENKMk9TSXNJbll4TUNJc0luWXhNU0lzSW5ZeE1pSXNJbVp2Y20xMWJHRWlMQ0ptYjNKdGN5SXNJbkpsYm1SbGNpSXNJbkJoY25ObGNpSXNJbWx0Y0c5eWRHVnlJaXdpYzJWaGNtTm9JaXdpWTI5dGJXVnVkSE1pTENKMllXeHBaR0YwYVc5dWN5SXNJbU5vWVhKMGN5SXNJbkJ5YVc1MElpd2lZbUZ5SWl3aWMyaGxaWFJ6SWl3aWMyaGhjR1Z6SWl3aWMyVnlkbVZ5SWl3aVptOXliV0YwSWl3aWRHOXdiV1Z1ZFNJc0luQnBkbTkwSWl3aWFXNTBjbUZ6YUdWbGRITWlYWDA9'
}

jspreadsheet.setLicense(license);

jspreadsheet.setExtensions({ formula, client });

const guid = '53aa4c90-791d-4a65-84a6-8ac25d6b1109'

// Connect to the server
let remote = client.connect({
  url: 'http://localhost:3009'
});

// Create just one time. Do nothing if already exists
remote.create(guid, {
  tabs: true,
  toolbar: true,
  worksheets: [{
    minDimensions: [4,6],
    worksheetName: 'Sheet1'
  }]
}).then((result) => {
  // Result
  console.log(result);
});


function App() {
  // Spreadsheet array of worksheets
  const spreadsheet = useRef();

  // Render component
  return (
      <Spreadsheet ref={spreadsheet} guid={guid} />
  );
}

export default App;

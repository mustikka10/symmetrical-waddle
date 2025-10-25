# World Clock - Multi-Time Zone Digital Clock

A clean, responsive digital clock application that displays the current time across multiple time zones simultaneously. Built with vanilla JavaScript, HTML, and CSS for simplicity and ease of use.

## Features

- **Real-time Updates**: Clock displays update every second with accurate time
- **Multiple Time Zones**: Display up to any number of time zones simultaneously
- **21 Pre-configured Time Zones**: Includes major cities and time zones worldwide
- **Dynamic Management**: Add or remove time zones on the fly
- **Persistent Storage**: Your selected time zones are saved and restored on page reload
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Modern, gradient design with smooth animations and hover effects
- **Default Clocks**: Automatically shows UTC, New York, and Tokyo on first visit

## Demo

### Desktop View
![World Clock Desktop](https://github.com/user-attachments/assets/5386d1be-8836-4114-bc64-3723a91bdb33)

### With Four Time Zones
![World Clock with Multiple Zones](https://github.com/user-attachments/assets/0e64067f-4c2e-4367-a06d-eb2c5111aff0)

### Mobile View
![World Clock Mobile](https://github.com/user-attachments/assets/4867802d-f292-4c0c-8a98-a025ad00c093)

## Usage

### Quick Start

1. Simply open `index.html` in your web browser
2. The clock will automatically display three default time zones (UTC, New York, Tokyo)
3. Add more time zones using the dropdown selector and "Add Time Zone" button
4. Remove time zones by clicking the "Remove" button on each clock card

### Adding a Time Zone

1. Click the dropdown menu at the top of the page
2. Select a time zone from the list
3. Click "Add Time Zone" button
4. The new clock will appear in the grid

### Removing a Time Zone

1. Locate the clock card you want to remove
2. Click the red "Remove" button in the top-right corner of the card
3. The clock will be removed immediately

### Available Time Zones

The application includes 21 commonly used time zones:

- **Americas**: New York, Chicago, Denver, Los Angeles, Anchorage, Honolulu
- **Europe**: London, Paris, Berlin, Moscow
- **Asia**: Dubai, Mumbai/Delhi, Beijing/Shanghai, Tokyo, Seoul, Singapore, Hong Kong
- **Pacific**: Sydney, Melbourne, Auckland
- **UTC**: Coordinated Universal Time

## Running Locally

### Option 1: Direct File Access
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Web Server
For a more production-like environment, serve the files using a local web server:

**Python 3:**
```bash
python3 -m http.server 8080
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

**Node.js (with http-server):**
```bash
npx http-server -p 8080
```

Then open `http://localhost:8080` in your browser.

## Technical Details

### Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `app.js` - Clock logic and time zone management

### Browser Compatibility

The application uses modern JavaScript features and requires:
- ES6+ support (const, let, arrow functions, classes)
- `Intl.DateTimeFormat` API for time zone support
- `localStorage` API for persistence

**Supported Browsers:**
- Chrome 24+
- Firefox 29+
- Safari 10+
- Edge 12+

### Data Persistence

Time zone selections are automatically saved to browser's `localStorage` and restored when you return to the page.

## Architecture

The application is built using a clean, object-oriented approach:

- **WorldClock Class**: Manages all clock instances and application state
- **Real-time Updates**: Uses `setInterval` to update all clocks every second
- **Event-Driven**: Responds to user interactions (add/remove) dynamically
- **DOM Manipulation**: Efficiently creates and removes clock cards as needed

## Future Enhancements

Potential features for future versions:
- Custom time zone support
- 12/24 hour format toggle
- Clock name customization
- Export/import clock configurations
- Analog clock view option
- Time zone search functionality

## Accessibility

The application includes:
- ARIA labels for form controls
- Keyboard navigation support
- Semantic HTML structure
- High contrast text and buttons

## License

This project is open source and available for use.
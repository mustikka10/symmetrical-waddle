// Multi-Time Zone Digital Clock Application

class WorldClock {
    constructor() {
        this.clocks = [];
        this.updateInterval = null;
        this.initializeTimeZones();
        this.initializeEventListeners();
        this.loadSavedClocks();
        this.startClockUpdates();
    }

    // List of commonly used time zones
    initializeTimeZones() {
        this.availableTimeZones = [
            { value: 'UTC', label: 'UTC - Coordinated Universal Time' },
            { value: 'America/New_York', label: 'New York (EST/EDT)' },
            { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
            { value: 'America/Denver', label: 'Denver (MST/MDT)' },
            { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
            { value: 'America/Anchorage', label: 'Anchorage (AKST/AKDT)' },
            { value: 'Pacific/Honolulu', label: 'Honolulu (HST)' },
            { value: 'Europe/London', label: 'London (GMT/BST)' },
            { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
            { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
            { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
            { value: 'Asia/Dubai', label: 'Dubai (GST)' },
            { value: 'Asia/Kolkata', label: 'Mumbai/Delhi (IST)' },
            { value: 'Asia/Shanghai', label: 'Beijing/Shanghai (CST)' },
            { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
            { value: 'Asia/Seoul', label: 'Seoul (KST)' },
            { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
            { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
            { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
            { value: 'Australia/Melbourne', label: 'Melbourne (AEDT/AEST)' },
            { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)' },
        ];

        this.populateTimeZoneSelect();
    }

    populateTimeZoneSelect() {
        const select = document.getElementById('timezone-select');
        this.availableTimeZones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.value;
            option.textContent = tz.label;
            select.appendChild(option);
        });
    }

    initializeEventListeners() {
        const addButton = document.getElementById('add-timezone-btn');
        const select = document.getElementById('timezone-select');

        addButton.addEventListener('click', () => this.addClock());
        select.addEventListener('change', () => this.updateAddButtonState());
        
        // Allow adding clock by pressing Enter in select
        select.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addClock();
            }
        });

        this.updateAddButtonState();
    }

    updateAddButtonState() {
        const select = document.getElementById('timezone-select');
        const addButton = document.getElementById('add-timezone-btn');
        addButton.disabled = !select.value;
    }

    addClock() {
        const select = document.getElementById('timezone-select');
        const timeZone = select.value;

        if (!timeZone) {
            return;
        }

        // Check if time zone already exists
        if (this.clocks.some(clock => clock.timeZone === timeZone)) {
            alert('This time zone is already displayed!');
            return;
        }

        const timeZoneLabel = this.availableTimeZones.find(tz => tz.value === timeZone)?.label || timeZone;

        const clock = {
            id: Date.now(),
            timeZone: timeZone,
            label: timeZoneLabel
        };

        this.clocks.push(clock);
        this.renderClock(clock);
        this.updateEmptyState();
        this.saveClocks();

        // Reset select
        select.value = '';
        this.updateAddButtonState();
    }

    removeClock(id) {
        this.clocks = this.clocks.filter(clock => clock.id !== id);
        const clockElement = document.querySelector(`[data-clock-id="${id}"]`);
        if (clockElement) {
            clockElement.remove();
        }
        this.updateEmptyState();
        this.saveClocks();
    }

    renderClock(clock) {
        const container = document.getElementById('clocks-container');
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.setAttribute('data-clock-id', clock.id);

        clockCard.innerHTML = `
            <div class="clock-header">
                <div class="timezone-label">${this.escapeHtml(clock.label)}</div>
                <button class="remove-btn" data-remove-id="${clock.id}">Remove</button>
            </div>
            <div class="time-display" data-time-id="${clock.id}">--:--:--</div>
            <div class="date-display" data-date-id="${clock.id}">Loading...</div>
        `;

        // Add event listener for remove button
        const removeBtn = clockCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => this.removeClock(clock.id));

        container.appendChild(clockCard);
        this.updateClock(clock);
    }

    updateClock(clock) {
        try {
            const now = new Date();
            
            // Format time
            const timeOptions = {
                timeZone: clock.timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const timeString = now.toLocaleTimeString('en-US', timeOptions);

            // Format date
            const dateOptions = {
                timeZone: clock.timeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const dateString = now.toLocaleDateString('en-US', dateOptions);

            // Update DOM
            const timeElement = document.querySelector(`[data-time-id="${clock.id}"]`);
            const dateElement = document.querySelector(`[data-date-id="${clock.id}"]`);

            if (timeElement) {
                timeElement.textContent = timeString;
            }
            if (dateElement) {
                dateElement.textContent = dateString;
            }
        } catch (error) {
            console.error(`Error updating clock for ${clock.timeZone}:`, error);
        }
    }

    startClockUpdates() {
        // Update all clocks immediately
        this.clocks.forEach(clock => this.updateClock(clock));

        // Update every second
        this.updateInterval = setInterval(() => {
            this.clocks.forEach(clock => this.updateClock(clock));
        }, 1000);
    }

    updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        if (this.clocks.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    saveClocks() {
        try {
            const clocksData = this.clocks.map(clock => ({
                timeZone: clock.timeZone,
                label: clock.label
            }));
            localStorage.setItem('worldClocks', JSON.stringify(clocksData));
        } catch (error) {
            console.error('Error saving clocks:', error);
        }
    }

    loadSavedClocks() {
        try {
            const saved = localStorage.getItem('worldClocks');
            if (saved) {
                const clocksData = JSON.parse(saved);
                
                // Add default clocks if none saved (first time users)
                if (clocksData.length === 0) {
                    this.addDefaultClocks();
                } else {
                    clocksData.forEach(data => {
                        const clock = {
                            id: Date.now() + Math.random(),
                            timeZone: data.timeZone,
                            label: data.label
                        };
                        this.clocks.push(clock);
                        this.renderClock(clock);
                    });
                }
            } else {
                // First time - add default clocks
                this.addDefaultClocks();
            }
        } catch (error) {
            console.error('Error loading saved clocks:', error);
            this.addDefaultClocks();
        }
        
        this.updateEmptyState();
    }

    addDefaultClocks() {
        // Add three default time zones for first-time users
        const defaultTimeZones = [
            'UTC',
            'America/New_York',
            'Asia/Tokyo'
        ];

        defaultTimeZones.forEach(tz => {
            const timeZoneLabel = this.availableTimeZones.find(t => t.value === tz)?.label || tz;
            const clock = {
                id: Date.now() + Math.random(),
                timeZone: tz,
                label: timeZoneLabel
            };
            this.clocks.push(clock);
            this.renderClock(clock);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});

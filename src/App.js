import React, { useState } from 'react';
import Calendar, { DecadeView } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import { getValue } from '@testing-library/user-event/dist/utils';
const mykey = 'AIzaSyCOXyQm3a7XEJ6Rm3nrWcmACARux9O-qkQ'
export default function CalendarGfg() {
    const [value, onChange] = useState(new Date());
    var now = new Date();
    /* getting next month date info
    var current = new Date(now.getFullYear(), now.getMonth()+1, 1); */
    return (
        <div>
            <h1>Test</h1>
            <Calendar
                value={value}
                locale="en-US"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+1, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+2, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+3, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+4, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+5, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+6, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+7, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+8, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+9, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+10, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+11, 1)}
                locale="en-GB"
                minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />
            <Calendar
                onChange={onChange}
                value={new Date(now.getFullYear(), now.getMonth()+12, 1)}
                locale="en-GB"minDetail='month'
                prev2Label={null}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
            />

        </div>
    );
}


///////////////////////////////////////////////////////////////////////
////////////////     Billing Maintenance Page       ///////////////////
///////////////////////////////////////////////////////////////////////
// DGO


'use strict';

import React, { Component } from 'react';
import { Container, Col, Row } from '../../components/grid/';
import { Input, TextArea, Button } from '../../components/form/';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import '../../styles/maintenancepage.css';

export const BillingMaintenance = ({ paymentSubmit, user, text }) => (
    <ErrorBoundary>
        { text.title ? ( <h2>{text.title}</h2> ): ("")}
        { text.body ? ( <p>{text.body}</p> ) : ("") }

    </ErrorBoundary>
);
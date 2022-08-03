import React from 'react'
import logo from '../../assets/logo.svg';
import './Header.css';
import { Button } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


Modal.setAppElement("#root");

function TabContent(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabContent.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Header(){
    const [modelIsOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModel() {
        setIsOpen(false);
    }
    return (
        <header>
            <Modal
                style={{ width: "300px" }}
                isOpen={modelIsOpen}
                onRequestClose={closeModel}
                contentLabel="Modal"
            >
                <TabContext value={value}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </TabList>
                    <TabContent value={value} index={0}>
                        Item One
                    </TabContent>
                    <TabContent value={value} index={1}>
                        Item Two
                    </TabContent>
                    <TabContent value={value} index={2}>
                        Item Three
                    </TabContent>
                </TabContext>

            </Modal>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <Button onClick={openModal} variant="contained">Login</Button>
        </header>
    )
}


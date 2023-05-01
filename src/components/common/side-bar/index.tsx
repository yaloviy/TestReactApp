import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';

import { useMediaQuery } from '@mui/material'

import { Box, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, IconButton } from '@mui/material'

import {Home, ChevronLeft, ChevronRight, Timeline, Settings, MeetingRoom, ImportContacts, Apps, FormatColorTextSharp, Menu} from '@mui/icons-material';
import Logo from '../../../assets/images/logo.svg'

import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from '../../flex-between';

import { navMenu } from '../../../common/moks/navigate';

import { tokens } from '../../../theme';
import { ISideBarProps } from '../../../common/types/sidebar';

const SideBar: React.FC<ISideBarProps> = ({isNonMobile, isOpen, setIsOpen, drawerWidth}:ISideBarProps): JSX.Element => {
    const classes = useStyles()
    const { pathname } = useLocation()
    const [active, setActive] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    useEffect(() => {
        setActive(pathname)
        console.log(active)
    }, [pathname])
    return (<Box className={classes.root}>
    
            
            {isOpen && (
                    <Drawer 
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    variant='persistent'
                    anchor='left'
                    
                    className={classes.drawer}
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            background: theme.palette.primary.main,
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            
                        },
                        background: `${colors.primary.DEFAULT}`,
                        
                    }}
                    
                >
                    <Box className={classes.topBox} > 
                        <Box width='100%'>
                            <FlexBetween>
                                <Box className={classes.brand} >
                                    <IconButton><img src={Logo} alt="logo image" /></IconButton><Typography variant='h1'>React</Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List className={classes.navList}>
                            {navMenu.map(el => (<ListItem  key={el.id}><ListItemButton className={active === el.path ? classes.active : classes.navitem} onClick={() => navigate(`${el.path}`)} key={el.id}><ListItemIcon>{el.icon}</ListItemIcon><ListItemText><Typography variant='body1'>{el.name}</Typography></ListItemText></ListItemButton></ListItem>))}
                        </List>
                    </Box>
                    <Box className={classes.bottomBox}>
                        <List>
                            <ListItem>
                                <ListItemButton className={classes.navitem}>
                                    <ListItemIcon>
                                        <MeetingRoom />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography>
                                            Выйти
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            )}
            </Box>
    );
};

export default SideBar;
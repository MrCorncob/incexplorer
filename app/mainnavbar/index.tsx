import { Navbar, useMantineColorScheme, Stack, Button, Accordion, Group, Avatar, Text } from '@mantine/core';
import { useState } from 'react';
import NavbarBtn from '~/components/navbarbtn/navbarbtn';
import { accordionLabelStyle } from './styles';

interface AccordionLabelProps {
    label: string;
    icon: string;
}

function AccordionLabel({ label, icon }: AccordionLabelProps) {
    return (
        <Group noWrap>
            <Avatar src={icon} radius="xl" size="md" />
            <div>
                <Text>{label}</Text>
            </div>
        </Group>
    );
}


function BlockChainSection() {
    return (
        <>
            <Stack justify="flex-start">
                <NavbarBtn text='Overview' link='/'></NavbarBtn>
                <NavbarBtn text='Beacon chain' link='/chain/beacon'></NavbarBtn>
                <NavbarBtn text='Shards chain' link='/chain/shards'></NavbarBtn>
                <NavbarBtn text='Transaction' link='/txs'></NavbarBtn>
                <NavbarBtn text='Pending txs' link='/pendingtxs'></NavbarBtn>
            </Stack>
        </>
    )
}

function ExchangeSection() {
    return (
        <>
            <Stack justify="flex-start">
                <NavbarBtn text='Market' link='/'></NavbarBtn>
                <NavbarBtn text='Liquidity' link='/'></NavbarBtn>
            </Stack>
        </>
    )
}

function ShieldedSection() {
    return (
        <>
            <Stack justify="flex-start">
                <NavbarBtn text='TVL' link='/'></NavbarBtn>
                <NavbarBtn text='Shield Volume' link='/'></NavbarBtn>
            </Stack>
        </>
    )
}

function NetworkSection() {
    return (
        <>
            <Stack justify="flex-start">
                <NavbarBtn text='Validators' link='/validators'></NavbarBtn>
            </Stack>
        </>
    )
}

function GetStartedSection() {
    return (
        <>
            <Stack justify="flex-start">
                <NavbarBtn text='Download' link='/'></NavbarBtn>
            </Stack>
        </>
    )
}
function MainNavbar() {
    const { classes } = accordionLabelStyle();
    return (
        <>
            <Navbar.Section>
                <Accordion iconPosition="right">
                    <Accordion.Item label={<AccordionLabel label='Blockchain' icon='/assets/images/icons/navbar-blockchain.svg' />} classNames={classes}>
                        <BlockChainSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Privacy Exchange' icon='/assets/images/icons/navbar-exchange.svg' />} classNames={classes}>
                        <ExchangeSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Shielded coins' icon='/assets/images/icons/navbar-shielded.svg' />} classNames={classes}>
                        <ShieldedSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Network' icon='/assets/images/icons/navbar-network.svg' />} classNames={classes}>
                        <NetworkSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Get started' icon='/assets/images/icons/navbar-getstarted.svg' />} classNames={classes}>
                        <GetStartedSection />
                    </Accordion.Item>
                </Accordion>


            </Navbar.Section>
        </>

    );
}

export default MainNavbar;
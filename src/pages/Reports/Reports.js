import React, { PureComponent } from 'react'
import { Container, Header, Body, Title, Content, Card, CardItem, Text } from 'native-base'
import { StackedAreaChart, StackedBarChart, AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class Reports extends PureComponent {
    render() {
        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff']
        const keys = ['apples', 'bananas', 'cherries', 'dates']

        const heatCoolData = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        return (
            <Container>
                <Header>
                    <Body><Title>Reports</Title></Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Energy Consumption</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <StackedAreaChart
                                style={{ height: 200, flex: 1, paddingVertical: 16 }}
                                data={data}
                                keys={keys}
                                colors={colors}
                                curve={shape.curveNatural}
                                showGrid={false}
                            />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Heat/Cool Requests</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <StackedBarChart
                                style={{ height: 200, flex: 1 }}
                                data={data}
                                keys={keys}
                                colors={colors}
                                contentInset={{ top: 30, bottom: 30 }}
                                showGrid={false}
                            />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text>Ambient Temperature</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <AreaChart
                                style={{ height: 200, flex: 1 }}
                                data={heatCoolData}
                                contentInset={{ top: 30, bottom: 30 }}
                                curve={shape.curveNatural}
                                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                                showGrid={false}
                            />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

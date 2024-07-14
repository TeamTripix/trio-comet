import React from 'react'
import { Container, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

const order = {
    orderId: '123456',
    date: '2024-06-15',
    customer: 'John Doe',
    items: [
        { name: 'Product 1', quantity: 2, price: 50 },
        { name: 'Product 2', quantity: 1, price: 30 },
    ],
    total: 130,
};

const Page = ({ params }: { params: { merchantID: string } }) => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
    <Typography variant="h4" gutterBottom>
        Order Details
    </Typography>
    <Card>
        <CardContent>
            <Typography variant="h6">Order ID: {order.orderId}</Typography>
            <Typography variant="subtitle1">Date: {order.date}</Typography>
            <Typography variant="subtitle1">Customer: {order.customer}</Typography>
        </CardContent>
    </Card>
    <Card style={{ marginTop: '1rem' }}>
        <CardContent>
            <Typography variant="h6">Items</Typography>
            <List>
                {order.items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity} - Price: $${item.price}`}
                            />
                        </ListItem>
                        {index < order.items.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <Divider />
            <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                <Typography variant="h6">Total: ${order.total}</Typography>
            </Grid>
        </CardContent>
    </Card>
</Container>
  )
}

export default Page
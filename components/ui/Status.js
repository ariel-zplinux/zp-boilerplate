import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const Status = (props) => (
    <Message icon>
        { props.loading ?<Icon name='spinner' loading /> : <Icon name='info circle' />}
        <Message.Content>
            <Message.Header>{props.title}</Message.Header>
            {props.content}
        </Message.Content>
    </Message>
);

export default Status;
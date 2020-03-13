export interface Page {
    id?: string;
    title?: string;
    boards?: Board[];
}

export interface Board {
    id?: string;
    title?: string;
    priority?: number;
    tasks?: Task[];
}

export interface Task {
    id?: string;
    description?: string;
    type?: 'task' | 'event' | 'note';
    label?: 'purple' |  'pink' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
    important?: boolean;
    checked?: boolean;
    sentToFuture?: boolean;
}

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
    type?: 'task' | 'event' | 'note' | 'checked' | 'noted';
    color?: 'purple' |  'pink' | 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'gray-noted';
    important?: boolean;
}

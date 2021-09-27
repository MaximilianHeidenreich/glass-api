
/**
 * Represents the entire data structure stored inside any store.
 */
export interface Store {
    events:     gEvent[]
}

export enum gEventType {
    WLOAD
}

/**
 * Represents a single event which got collected.
 */
export interface gEvent {
    timestamp:  number
    typ:        gEventType
    pageID:     string
    clientID:   string
}
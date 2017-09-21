class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config
        this.curernt_state = config.initial
        this.undo_state = []
        this.redo_state = []
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.curernt_state
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states[state] !== undefined) {
            this.redo_state = []
            this.undo_state.push(this.curernt_state)
            this.curernt_state = state
        }
        else {
            throw new Error ("State does not exist")
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {   
        if(this.config.states[this.curernt_state].transitions[event] !== undefined) {
            this.redo_state = []
            this.undo_state.push(this.curernt_state)
            this.curernt_state = this.config.states[this.curernt_state].transitions[event]
        }
        else {
            throw new Error("Event does not exist")
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.curernt_state = this.config.initial
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = []
        if(event === undefined) {
            for(let i in this.config.states) {
                states.push(String(i))
            }
        }
        else {
            for(let i in this.config.states) {
                if(this.config.states[i].transitions[event] !== undefined) {
                    states.push(String(i))
                }
            }
        }

        return states
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(!this.undo_state.length) {
            return false
        }
        else {
            this.redo_state.push(this.curernt_state)
            this.curernt_state = this.undo_state.pop()
            return true
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this.redo_state.length) {
            return false
        }
        else {
            this.undo_state.push(this.curernt_state)
            this.curernt_state = this.redo_state.pop()
            return true
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.redo_state = []
        this.undo_state = []
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

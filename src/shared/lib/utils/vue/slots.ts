import { useSlots } from "vue";

export const hasSlot = (name: string) => {
    const slots = useSlots()
    return !!slots[ name ]
}

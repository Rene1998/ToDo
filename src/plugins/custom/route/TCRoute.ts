import { Component } from 'vue'

export type TCRoute = [title: string, path: string, component: ReturnType<() => Component>]

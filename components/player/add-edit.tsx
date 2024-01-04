/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { cloneDeep } from "lodash"
import { FluidPlayerConfigurator } from "@/components/fluid-player-configurator"
import { ConfiguratorOptions } from "@/types"
import { useAlertService, usePlayerService } from "@/services"

export { AddEdit }

function AddEdit({
  title,
  player,
}: {
  title: string
  player: ConfiguratorOptions & { id?: string }
}) {
  const router = useRouter()
  const alertService = useAlertService()
  const playerService = usePlayerService()
  const [currentPlayer, setCurrentPlayer] =
    useState<ConfiguratorOptions>(player)
  const formMethods = useForm<ConfiguratorOptions>({
    defaultValues: { ...cloneDeep(currentPlayer) },
  })

  async function onSubmit() {
    formMethods.trigger()

    if (!formMethods.formState.isValid) {
      alertService.error(
        "Some fields have errors. Please check your input and try again."
      )
      return
    }

    alertService.clear()
    try {
      // create or update user based on user prop

      let message
      if (player.id) {
        await playerService.update(player.id, formMethods.getValues() as any)
        message = "Player configuration updated successfully."
      } else {
        await playerService.create(formMethods.getValues() as any)
        message = "Player configuration added successfully."
      }

      // redirect to user list with success message
      router.push("/players")
      alertService.success(message, true)
    } catch (error: unknown) {
      alertService.error(error)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <div className="container mx-auto h-full grid grid-rows-[50px_1fr_50px] gap-2">
        <h1 className="my-3 text-xl">{title}</h1>
        <FluidPlayerConfigurator
          onSave={(data) => setCurrentPlayer({ ...currentPlayer, ...data })}
        />
        <div className="flex justify-end items-center gap-2 pb-4">
          <Link
            href="/players"
            className="rounded bg-gray-200 text-gray-800 px-3 py-1">
            Cancel
          </Link>
          <button
            type="button"
            className="rounded bg-green-500 text-gray-100 px-3 py-1"
            onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </FormProvider>
  )
}

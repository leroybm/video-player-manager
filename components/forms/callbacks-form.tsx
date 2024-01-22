"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import { FormField, FunctionInput } from "@/components/fields"

export function CallbacksForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ConfiguratorOptions>()

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormField
        label="Player Init Callback"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.playerInitCallback
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playerinitcallback">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.layoutControls.playerInitCallback"
          placeholder="(function() { console.log('player loaded!') })"
        />
      </FormField>

      <FormField
        label="Configure HLS"
        errorMessage={
          errors.playerConfiguration?.modules?.configureHls?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#configurehls">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.configureHls"
          placeholder="(options) => {
            return options;
          }"
        />
      </FormField>

      <FormField
        label="Before Init HLS"
        errorMessage={
          errors.playerConfiguration?.modules?.onBeforeInitHls?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onbeforeinithls">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.onBeforeInitHls"
          placeholder="(hls) => {
          }"
        />
      </FormField>

      <FormField
        label="After Init HLS"
        errorMessage={
          errors.playerConfiguration?.modules?.onAfterInitHls?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onafterinithls">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.onAfterInitHls"
          placeholder="(hls) => {
          }"
        />
      </FormField>

      <FormField
        label="Configure DASH"
        errorMessage={
          errors.playerConfiguration?.modules?.configureDash?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#configuredash">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.configureDash"
          placeholder="(options) => {
            return options;
          }"
        />
      </FormField>

      <FormField
        label="Before Init DASH"
        errorMessage={
          errors.playerConfiguration?.modules?.onBeforeInitHls?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onbeforeinitdash">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.onBeforeInitHls"
          placeholder="(dash) => {
          }"
        />
      </FormField>

      <FormField
        label="After Init DASH"
        errorMessage={
          errors.playerConfiguration?.modules?.onAfterInitDash?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onafterinitdash">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.modules.onAfterInitDash"
          placeholder="(dash) => {
          }"
        />
      </FormField>

      <FormField
        label="Before XMLHttpRequestOpen"
        errorMessage={
          errors.playerConfiguration?.onBeforeXMLHttpRequestOpen?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onbeforexmlhttprequestopen">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.onBeforeXMLHttpRequestOpen"
          placeholder="(request) => {
          }"
        />
      </FormField>

      <FormField
        label="Before XMLHttpRequest"
        errorMessage={
          errors.playerConfiguration?.onBeforeXMLHttpRequest?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/advanced/#onbeforexmlhttprequest">
        <FunctionInput
          register={register}
          fieldName="playerConfiguration.onBeforeXMLHttpRequest"
          placeholder="(request) => {
          }"
        />
      </FormField>
    </form>
  )
}

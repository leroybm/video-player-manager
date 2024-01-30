
variable "tca_app_name" {
  type        = string
  default     = "FP Manager"
  description = "The name of the Amplify Application"
}
variable "tca_existing_repo_url" {
  type        = string
  default     = "https://github.com/berTrindade/video-player-manager"
  description = "URL for the existing repo"

}
variable "tca_github_access_token" {
  type        = string
  default     = ""
  description = "Optional GitHub access token. Only required if using GitHub repo."
}
variable "tca_amplify_app_framework" {
  type    = string
  default = "Next.js - SSR"
}

variable "tca_amplify_branch_main_name" {
  type    = string
  default = "feature/something"
}

variable "tca_amplify_branch_main_stage" {
  type    = string
  default = "PRODUCTION"
}

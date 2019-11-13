# Bazel workspace created by @bazel/create 0.39.0

# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/master/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "npm_repro",
    # Map the @npm bazel workspace to the node_modules directory.
    # This lets Bazel use the same node_modules as other local tooling.
    managed_directories = {
        "@npm": ["node_modules"],
        "@npm_app1": ["packages/app1/node_modules"],
        "@npm_app2": ["packages/app2/node_modules"]
    },
)

# Install the nodejs "bootstrap" package
# This provides the basic tools for running and packaging nodejs programs in Bazel
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "3d7296d834208792fa3b2ded8ec04e75068e3de172fae79db217615bd75a6ff7",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.39.1/rules_nodejs-0.39.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dev_dependencies")
rules_nodejs_dev_dependencies()

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

# We use git_repository since Renovate knows how to update it.
# With http_archive it only sees releases/download/*.tar.gz urls
git_repository(
    name = "build_bazel_rules_typescript",
    commit = "36019ce195fc54ddabc75defaadf597e1139f69d",
    remote = "http://github.com/bazelbuild/rules_typescript.git",
)

# We have a source dependency on build_bazel_rules_typescript
# so we must repeat its transitive toolchain deps
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dev_dependencies")

rules_typescript_dev_dependencies()

# The yarn_install rule runs yarn anytime the package.json or yarn.lock file changes.
# It also extracts and installs any Bazel rules distributed in an npm package.
load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")
yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
    quiet = True
)

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm_lib1",
    package_json = "//packages/lib1:package.json",
    yarn_lock = "//packages/lib1:yarn.lock",
    quiet = True
)

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm_app1",
    package_json = "//packages/app1:package.json",
    yarn_lock = "//packages/app1:yarn.lock",
    quiet = True
)

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm_app2",
    package_json = "//packages/app2:package.json",
    yarn_lock = "//packages/app2:yarn.lock",
    quiet = True
)

# Install any Bazel rules which were extracted earlier by the yarn_install rule.
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

# Setup TypeScript toolchain 
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()
